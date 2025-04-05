'use client'
import { useEffect, useState, useRef, useCallback } from 'react';
import { Map, GeoJSONSource } from 'mapbox-gl';
import {mapBoxConfig} from '@/infra/config/mapBoxConfig';
import { ICensusPoint } from '@/application/interfaces/ICensusPoint';
import { useDrawereData } from '@/application/stores/DrawereData';
import { ICensusPointDto } from '@/application/interfaces/ICensusPointDto';
import { useMapActions } from '@/application/stores/MapActions.store';
import useLayerInteraction from './hooks/useLayerInteraction';
import { GeoJsonProperties } from 'geojson';
import useMapClickHandler from './hooks/useMapClickHandler';

// criar a estrutura GeoJSON 
const createGeoJsonFeatureCollection = (data: ICensusPoint[]): GeoJSON.FeatureCollection<GeoJSON.Point, GeoJsonProperties> => {
    return {
     type: 'FeatureCollection',
     features: data.map((point) => ({
         type: 'Feature',
         geometry: {
             type: 'Point',
             coordinates: [point.longitude, point.latitude],
         },
         properties: Object.keys(point)
             .filter(key => key !== 'longitude' && key !== 'latitude')
             .reduce((obj, key) => {
                 const value = point[key as keyof ICensusPoint];
                 obj![key as keyof GeoJsonProperties] = typeof value === 'string' ? parseFloat(value) || 0 : (typeof value === 'number' ? value : 0);
                 return obj;
             }, {} as GeoJsonProperties),
     })),
 };
};


export function useMapDataProcessing(
    mapRef: React.RefObject<Map | null>,
    isMapLoaded: boolean,
    censusData: ICensusPoint[],
    isIconLoaded: boolean
  ) {
    const [batchIndex, setBatchIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [processedData, setProcessedData] = useState<ICensusPoint[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pinCount, setPinCount] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pinsInsidePolygon, setPinsInsidePolygon] = useState<ICensusPoint[]>([]);

    const { setSelectedPoint } = useDrawereData();
    const { changeDrawereState } = useMapActions();

    const isProcessingComplete = useRef(false);
    // Use refs to track if layers/source exist to prevent duplicates
    const sourceExists = useRef(false);
    const clusterCircleLayerExists = useRef(false);
    const clusterTextLayerExists = useRef(false);
    const unclusteredLayerExists = useRef(false);


    // Função para converter propriedades GeoJSON de volta para seu DTO (mantida)
    const convertToICensusPoint = (properties: GeoJsonProperties, coordinates: [number, number]): ICensusPointDto => {
         console.log("📌 Propriedades recebidas para conversão DTO:", properties);
         console.log("📌 Coordenadas recebidas para conversão DTO:", coordinates);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dto: any = { 
            latitude: coordinates[1],
            longitude: coordinates[0],
        };

        // Tenta converter todas as propriedades para número, tratando null/undefined como 0
        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                const value = properties[key as keyof GeoJsonProperties];
                const numValue = Number(value);
                dto[key] = isNaN(numValue) ? 0 : numValue; 
                
            }
        }
        return dto as ICensusPointDto;
    };


 // *** FUNÇÃO PRINCIPAL REFEITA para adicionar fonte e camadas corretamente ***
const setupSourceAndLayer = useCallback((currentMap: Map, data: ICensusPoint[]) => {
    const geoJsonData = createGeoJsonFeatureCollection(data);
    console.log(geoJsonData)
    // --- FONTE (SOURCE) ---
    const source = currentMap.getSource(mapBoxConfig.SOURCE_ID) as GeoJSONSource | undefined;
    if (source) {
      // Se a fonte já existe, apenas atualiza os dados
      source.setData(geoJsonData);
      console.log(`🔄 Fonte '${mapBoxConfig.SOURCE_ID}' atualizada.`);
    } else if (!sourceExists.current) {
      // Se a fonte não existe, cria ela com as cluster properties
      try {
        console.log(`➕ Adicionando fonte '${mapBoxConfig.SOURCE_ID}' com clustering...`);
        currentMap.addSource(mapBoxConfig.SOURCE_ID, {
          type: "geojson",
          data: geoJsonData,
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 14,
          clusterProperties:{
            "sum_particular": ["+", ["get", "censo_2022_domicilio_particular_poi_counts"]],
            "sum_agro": ["+", ["get", "censo_2022_estabelecimento_agro_poi_counts"]],
            "sum_construcao": ["+", ["get", "censo_2022_estabelecimento_construcao_poi_counts"]]
          } // Zoom máximo onde os pontos ainda clusterizam
          
        });
        sourceExists.current = true; // Marca que a fonte foi criada
        console.log(`✅ Fonte '${mapBoxConfig.SOURCE_ID}' adicionada.`);
      } catch (error) {
        console.error(`❌ Erro ao adicionar fonte '${mapBoxConfig.SOURCE_ID}':`, error);
        // Tentar limpar se algo deu errado na adição
        if (currentMap.getSource(mapBoxConfig.SOURCE_ID)) currentMap.removeSource(mapBoxConfig.SOURCE_ID);
        throw error; // Re-lança o erro para parar o processamento do lote
      }
    }
  
    // --- CAMADAS (LAYERS) ---
    // Só adiciona as camadas se a fonte existir e o ícone estiver carregado
    if (sourceExists.current && isIconLoaded) {
  
      // 1. Camada de CÍRCULO para Clusters
      if (!clusterCircleLayerExists.current && !currentMap.getLayer("clusters-circle")) {
        try {
          console.log("➕ Adicionando camada 'clusters-circle'...");
          currentMap.addLayer({
            id: "clusters-circle", 
            type: "circle",
            source: mapBoxConfig.SOURCE_ID, 
            filter: ["has", "point_count"], 

            paint: {
              // Estilo baseado na contagem de pontos no cluster
              "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f1465d"],
              "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
            },
          });
          clusterCircleLayerExists.current = true; // Marca que a camada foi criada
          console.log("✅ Camada 'clusters-circle' adicionada.");
        } catch (error) {
          console.error("❌ Erro ao adicionar camada 'clusters-circle':", error);
        }
      }
  
      // 2. Camada de TEXTO (MÉDIA) para Clusters
      if (!clusterTextLayerExists.current && !currentMap.getLayer("cluster-average-text")) {
        try {
          console.log("➕ Adicionando camada 'cluster-average-text'...");
          currentMap.addLayer({
            id: "cluster-count-text", // Melhor nome para refletir o que está sendo exibido
            type: "symbol",
            source: mapBoxConfig.SOURCE_ID,
            filter: ["has", "point_count"], // Filtra apenas os clusters
            layout: {
                "text-field": ["concat", "Total: ", ["to-string", ["get", "sum_particular"]]],
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                "text-size": 10
            },
            paint: {
                "text-color": "#fff8f8"
            }
          });
          clusterTextLayerExists.current = true; // Marca que a camada foi criada
          console.log("✅ Camada 'cluster-average-text' adicionada.");
        } catch (error) {
          console.error("❌ Erro ao adicionar camada 'cluster-average-text':", error);
        }
      }
  
      // 3. Camada de ÍCONES para Pontos INDIVIDUAIS (Não Clusterizados)
      // Use o ID que você definiu em mapBoxConfig.LAYER_ID
      if (!unclusteredLayerExists.current && !currentMap.getLayer(mapBoxConfig.LAYER_ID)) {
        try {
          console.log(`➕ Adicionando camada '${mapBoxConfig.LAYER_ID}' para pontos individuais...`);
          currentMap.addLayer({
            id: mapBoxConfig.LAYER_ID, // ID para pontos individuais (talvez renomear para algo como "unclustered-points" ?)
            type: "symbol",
            source: mapBoxConfig.SOURCE_ID, // Referencia a fonte correta
            filter: ['!', ['has', 'point_count']], // Filtro CORRETO: Mostra apenas pontos que NÃO são clusters
            layout: {
              "icon-image": mapBoxConfig.MARKER_ICON_ID, // ID do ícone carregado
              "icon-size": 0.5,
              "icon-allow-overlap": false, // Geralmente false para evitar sobreposição de ícones
              "icon-ignore-placement": false, // Geralmente false para evitar sobreposição de ícones
              "icon-anchor": "bottom",
            },
          });
          unclusteredLayerExists.current = true; // Marca que a camada foi criada
          console.log(`✅ Camada '${mapBoxConfig.LAYER_ID}' adicionada.`);
        } catch (error) {
          console.error(`❌ Erro ao adicionar camada '${mapBoxConfig.LAYER_ID}':`, error);
        }
      }
    }
  }, [isIconLoaded]); // Depende apenas de isIconLoaded para lógica de adição de camadas
  
  // Hooks de interação e mouse (mantidos como estavam)
  useLayerInteraction(setSelectedPoint, convertToICensusPoint, changeDrawereState);
 
  useMapClickHandler() // Assumindo que este hook adiciona seus próprios listeners
  
  // Efeito para processar dados em lotes (mantido como estava, mas chama setupSourceAndLayer)
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded || !isIconLoaded || censusData.length === 0 || isProcessingComplete.current) return;
  
    console.log("⏳ Iniciando processamento de lotes...");
    const intervalId = setInterval(() => {
      const start = batchIndex * mapBoxConfig.BATCH_SIZE;
      if (start >= censusData.length) {
        console.log("✅ Processamento de lotes concluído!");
        clearInterval(intervalId);
        isProcessingComplete.current = true;
        return;
      }
  
      const end = Math.min(start + mapBoxConfig.BATCH_SIZE, censusData.length);
      const newBatch = censusData.slice(start, end);
  
      if (newBatch.length > 0) {
        setProcessedData((prev) => {
          const updatedData = [...prev, ...newBatch];
          try {
            if (mapRef.current?.isStyleLoaded() && mapRef.current.isSourceLoaded(mapBoxConfig.SOURCE_ID)) { // Adicionado isSourceLoaded check
              setupSourceAndLayer(mapRef.current, updatedData);
            } else if (mapRef.current?.isStyleLoaded() && !sourceExists.current) {
              setupSourceAndLayer(mapRef.current, updatedData);
            }
          } catch (error) {
            console.error("❌ Erro durante setupSourceAndLayer no processamento do lote:", error);
            clearInterval(intervalId); // Para o processamento em caso de erro grave
          }
          return updatedData;
        });
        setBatchIndex((prev) => prev + 1);
      } else {
        console.warn("⚠️ Lote vazio encontrado antes do fim dos dados.");
        clearInterval(intervalId);
        isProcessingComplete.current = true;
      }
    }, mapBoxConfig.BATCH_INTERVAL_MS);
  
    return () => {
      console.log("🧹 Limpando intervalo de processamento de lotes...");
      clearInterval(intervalId);
    };
  }, [mapRef, isMapLoaded, censusData, batchIndex, setupSourceAndLayer, isIconLoaded]); // Adicionado isIconLoaded como dependência
  
  // Efeito para limpar camadas e fonte ao desmontar ou quando dependências mudam
  useEffect(() => {
    return () => {
      console.log("🧹 Limpando camadas e fonte ao desmontar...");
      // Reseta os flags de existência
      sourceExists.current = false;
      clusterCircleLayerExists.current = false;
      clusterTextLayerExists.current = false;
      unclusteredLayerExists.current = false;
      isProcessingComplete.current = false; // Reseta o status de processamento
      setBatchIndex(0); // Reseta o índice do lote
      setProcessedData([]); // Limpa os dados processados
  
      if (mapRef.current?.isStyleLoaded()) {
        const map = mapRef.current;
        // Remove camadas na ordem inversa (texto, círculo, pontos individuais)
        try { if (map.getLayer("cluster-average-text")) map.removeLayer("cluster-average-text"); } catch (e) { console.warn("Warn: Erro ao remover cluster-average-text", e); }
        try { if (map.getLayer("clusters-circle")) map.removeLayer("clusters-circle"); } catch (e) { console.warn("Warn: Erro ao remover clusters-circle", e); }
        try { if (map.getLayer(mapBoxConfig.LAYER_ID)) map.removeLayer(mapBoxConfig.LAYER_ID); } catch (e) { console.warn(`Warn: Erro ao remover ${mapBoxConfig.LAYER_ID}`, e); }
        // Remove a fonte por último
        try { if (map.getSource(mapBoxConfig.SOURCE_ID)) map.removeSource(mapBoxConfig.SOURCE_ID); } catch (e) { console.warn(`Warn: Erro ao remover ${mapBoxConfig.SOURCE_ID}`, e); }
        console.log("✅ Camadas e fonte removidas.");
      } else {
        console.log("ℹ️ Mapa não carregado ou estilo não pronto, limpeza de camadas/fonte pulada.");
      }
    };
    // A dependência mapRef aqui garante limpeza se o próprio ref do mapa mudar (raro)
    // A ausência de outras dependências como censusData aqui é intencional para
    // que a limpeza ocorra *apenas* na desmontagem do componente que usa o hook.
    // Se você precisar que a limpeza ocorra quando censusData muda, adicione-o aqui,
    // mas isso pode causar piscadas no mapa se não for bem gerenciado.
  }, [mapRef]);
  

}