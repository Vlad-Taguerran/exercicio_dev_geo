'use client'
import { useEffect, useState, useRef, useCallback } from 'react';
import mapboxgl, { Map, GeoJSONSource, LngLatLike, MapMouseEvent, GeoJSONFeature } from 'mapbox-gl';
import {mapBoxConfig} from '@/infra/config/mapBoxConfig';
import { ICensusPoint } from '@/application/interfaces/ICensusPoint';
import { GeoJsonProperties } from '@/types/GeoJsonProperties';

const createPopupHtml = (properties: GeoJsonProperties): string => {
  // Usa ?? 'N/A' para lidar com valores ausentes/nulos
 return `
     <div style="font-family: sans-serif; font-size: 0.9em; max-width: 250px;">
         <strong>Ponto Censitário</strong><br />
         <hr style="margin: 2px 0;" />
         🏠 Particulares: ${properties.censo_2022_domicilio_particular_poi_counts ?? 'N/A'}<br />
         🏢 Coletivos: ${properties.censo_2022_domicilio_coletivo_poi_counts ?? 'N/A'}<br />
         🏗️ Construção: ${properties.censo_2022_estabelecimento_construcao_poi_counts ?? 'N/A'}<br />
         🏫 Ensino: ${properties.censo_2022_estabelecimento_ensino_poi_counts ?? 'N/A'}<br />
         ⛪ Religioso: ${properties.censo_2022_estabelecimento_religioso_poi_counts ?? 'N/A'}<br />
         🏥 Saúde: ${properties.censo_2022_estabelecimento_saude_poi_counts ?? 'N/A'}<br />
         🌱 Agro: ${properties.censo_2022_estabelecimento_agro_poi_counts ?? 'N/A'}
     </div>
 `;
};

// Helper para criar a estrutura GeoJSON
const createGeoJsonFeatureCollection = (data: ICensusPoint[]): GeoJSON.FeatureCollection<GeoJSON.Point, GeoJsonProperties> => {
 return {
     type: 'FeatureCollection',
     features: data.map((point) => ({
         type: 'Feature',
         geometry: {
             type: 'Point',
             coordinates: [point.longitude, point.latitude],
         },
         // Mapeia todas as propriedades exceto lat/lon
         properties: Object.keys(point)
             .filter(key => key !== 'longitude' && key !== 'latitude')
             .reduce((obj, key) => {
                 obj[key as keyof GeoJsonProperties] = point[key];
                 return obj;
             }, {} as GeoJsonProperties),
     })),
 };
};

export function useMapDataProcessing(
  mapRef: React.RefObject<Map | null>,
  isMapLoaded: boolean,
  censusData: ICensusPoint[],
  isIconLoaded: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [processedData, setProcessedData] = useState<ICensusPoint[]>([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const listenersAttached = useRef(false);
  const isProcessingComplete = useRef(false); // Para evitar reprocessamento desnecessário
  const layerExists = useRef(false);

  // Função para adicionar/atualizar fonte e camada (memoizada)
  const setupSourceAndLayer = useCallback((currentMap: Map, data: ICensusPoint[]) => {
      const geoJsonData = createGeoJsonFeatureCollection(data);
      const source = currentMap.getSource(mapBoxConfig.SOURCE_ID) as GeoJSONSource | undefined;

      if (source) {
          source.setData(geoJsonData);
      } else {
          try {
               console.log(`➕ Adicionando fonte '${mapBoxConfig.SOURCE_ID}' e camada '${mapBoxConfig.LAYER_ID}'...`);
               currentMap.addSource(mapBoxConfig.SOURCE_ID, { type: 'geojson', data: geoJsonData,cluster: true,
                clusterRadius: 50,
                clusterMaxZoom: 14 });
               
          } catch(error) {
               console.error(`❌ Erro ao adicionar fonte/camada ${mapBoxConfig.SOURCE_ID}/${mapBoxConfig.LAYER_ID}:`, error)
               // Se falhar, remover o que foi adicionado parcialmente
                if (currentMap.getLayer(mapBoxConfig.LAYER_ID)) currentMap.removeLayer(mapBoxConfig.LAYER_ID);
                if (currentMap.getSource(mapBoxConfig.SOURCE_ID)) currentMap.removeSource(mapBoxConfig.SOURCE_ID);
                throw error; // Propaga o erro para interromper o processo
          }

      }
      if (currentMap.getSource(mapBoxConfig.SOURCE_ID) && isIconLoaded && !layerExists.current) {
        try {
            console.log(`➕ Adicionando camada '${mapBoxConfig.LAYER_ID}' do tipo SYMBOL...`);
            //camada nivel3
            currentMap.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: mapBoxConfig.SOURCE_ID,
              filter: ['has', 'point_count'],
              layout: {
                  'text-field': '{point_count_abbreviated}',
                  'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                  'text-size': 12,
              },
              paint: {
                  'text-color': '#fff',
              },
          });
            //camada nivel 2
            currentMap.addLayer({
              id: 'clusters',
              type: 'circle',
              source: mapBoxConfig.SOURCE_ID,
              filter: ['has', 'point_count'],
              paint: {
                  'circle-color': [
                      'step',
                      ['get', 'point_count'],
                      '#51bbd6',
                      100,
                      '#f1f075',
                      750,
                      '#f28cb1',
                  ],
                  'circle-radius': [
                      'step',
                      ['get', 'point_count'],
                      20,
                      100,
                      30,
                      750,
                      40,
                  ],
              },
          });
            //camada nivel 1
            currentMap.addLayer({
                id: mapBoxConfig.LAYER_ID,
                // --- ALTERAÇÃO PRINCIPAL AQUI ---
                type: 'symbol', // <-- Muda para symbol
                source: mapBoxConfig.SOURCE_ID,
                layout: {
                    'icon-image': mapBoxConfig.MARKER_ICON_ID, // <-- Usa o ID do ícone carregado
                    'icon-size': 0.90, // <-- Ajuste o tamanho conforme necessário (ex: 0.5 = 50%)
                    'icon-allow-overlap': false, // Permite sobreposição de ícones
                    'icon-ignore-placement': true, // Força a exibição mesmo se houver colisões
                    // 'icon-anchor': 'bottom', // Opcional: Ancora o ícone pela base (bom para pins)
                },
                // Removidas as propriedades 'paint' de círculo
            });
            layerExists.current = true; // Marca que a camada foi adicionada
        } catch (error) {
             console.error(`❌ Erro ao adicionar camada ${mapBoxConfig.LAYER_ID}:`, error)
             // Não joga erro aqui para não parar o processamento de dados,
             // mas os marcadores não aparecerão. Pode remover a fonte se preferir:
             // if (currentMap.getSource(SOURCE_ID)) currentMap.removeSource(SOURCE_ID);
        }
    }
  }, [isIconLoaded]); // Sem dependências, pois usa apenas constantes e argumentos



 
    // Função para adicionar listeners (memoizada)
    const attachMapListeners = useCallback((currentMap: Map) => {
      if (listenersAttached.current) return;
       console.log(`👂 Adicionando listeners para a camada '${mapBoxConfig.LAYER_ID}'...`);

      const handleMapClick = (e: MapMouseEvent & {features?: GeoJSONFeature[]  }) => {
           if (!e.features || e.features.length === 0) return;
           const feature = e.features[0];
           if (feature.geometry.type !== 'Point' || !feature.properties) return;

           const properties = feature.properties as GeoJsonProperties;

           const coordinates = feature.geometry.coordinates.slice() as LngLatLike;

           new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
               .setLngLat(coordinates)
               .setHTML(createPopupHtml(properties))
               .addTo(currentMap);
       };

       const handleMouseEnter = () => {
          currentMap.getCanvas().style.cursor = 'pointer';
       };

       const handleMouseLeave = () => {
           currentMap.getCanvas().style.cursor = '';
       };

      currentMap.on('click', mapBoxConfig.LAYER_ID, handleMapClick);
      currentMap.on('mouseenter', mapBoxConfig.LAYER_ID, handleMouseEnter);
      currentMap.on('mouseleave', mapBoxConfig.LAYER_ID, handleMouseLeave);

      listenersAttached.current = true;

      // Retorna função de limpeza para remover listeners específicos
      return () => {
          if (listenersAttached.current && currentMap.isStyleLoaded()) { // Checa se o mapa ainda existe
               console.log(`👂 Removendo listeners da camada '${mapBoxConfig.LAYER_ID}'...`);
               try {
                  currentMap.off('click', mapBoxConfig.LAYER_ID, handleMapClick);
                  currentMap.off('mouseenter', mapBoxConfig.LAYER_ID, handleMouseEnter);
                  currentMap.off('mouseleave', mapBoxConfig.LAYER_ID, handleMouseLeave);
                  listenersAttached.current = false;
               } catch (error) {
                   console.error(`❌ Erro ao remover listeners da camada ${mapBoxConfig.LAYER_ID}:`, error)
               }

          }
      };
  }, []); // Sem dependências


    // Efeito para processar dados em lote
    useEffect(() => {
      const currentMap = mapRef.current;
      // Condições para iniciar/continuar o processamento
      if (!currentMap || !isMapLoaded || !isIconLoaded  || censusData.length === 0 || isProcessingComplete.current) {
          return;
      }

      console.log('⏳ Iniciando/Continuando processamento de lotes...');
      let removeListeners: (() => void) | undefined; // Para guardar a função de limpeza dos listeners

      const intervalId = setInterval(() => {
          const start = batchIndex * mapBoxConfig.BATCH_SIZE;
          if (start >= censusData.length) {
              console.log('✅ Processamento de lotes concluído!');
              clearInterval(intervalId);
              isProcessingComplete.current = true; // Marca como concluído
              return;
          }

          const end = Math.min(start + mapBoxConfig.BATCH_SIZE, censusData.length);
          const newBatch = censusData.slice(start, end);

          if (newBatch.length > 0) {
              setProcessedData((prev) => {
                  const updatedData = [...prev, ...newBatch];
                   try {
                       if(currentMap.isStyleLoaded()) { // Garante que o estilo ainda está carregado
                           setupSourceAndLayer(currentMap, updatedData);
                           // Adiciona listeners APENAS UMA VEZ após a camada ser criada
                          if (layerExists.current && !listenersAttached.current) {
                              removeListeners = attachMapListeners(currentMap);
                          }
                       } else {
                          console.warn("⚠️ Estilo do mapa descarregado durante o processamento do lote.")
                          //clearInterval(intervalId); // Interrompe se o mapa foi removido
                       }

                   } catch(error) {
                       console.error("❌ Erro ao processar lote:", error)
                       clearInterval(intervalId); // Interrompe em caso de erro grave
                   }
                  return updatedData;
              });
              setBatchIndex((prev) => prev + 1);
          }
      }, mapBoxConfig.BATCH_INTERVAL_MS);

      // Função de limpeza para o intervalo e listeners
      return () => {
           console.log("🧹 Limpando intervalo e listeners de lote...");
           clearInterval(intervalId);
           // Remove listeners se eles foram adicionados por este efeito
          if(removeListeners) {
               removeListeners();
          }
      };
  }, [mapRef, isMapLoaded, censusData, batchIndex, setupSourceAndLayer, attachMapListeners, isIconLoaded]);
    // Efeito para limpar camada e fonte quando o componente desmontar ou dados zerarem
    useEffect(() => {
      const currentMap = mapRef.current;
      // Função de limpeza principal para remover camada/fonte
      return () => {
        layerExists.current = false;
             isProcessingComplete.current = false;
             setBatchIndex(0);
             setProcessedData([]);

          if (currentMap && currentMap.isStyleLoaded()) {
               console.log(`🧹 Removendo camada '${mapBoxConfig.LAYER_ID}' e fonte '${mapBoxConfig.SOURCE_ID}'...`);
               try {
                  if (currentMap.getLayer(mapBoxConfig.LAYER_ID)) currentMap.removeLayer(mapBoxConfig.LAYER_ID);
                  if (currentMap.getSource(mapBoxConfig.SOURCE_ID)) currentMap.removeSource(mapBoxConfig.SOURCE_ID);
               } catch(error) {
                   console.error("❌ Erro ao remover camada/fonte:", error);
               }

          }
           // Resetar estado ao desmontar ou zerar dados
           isProcessingComplete.current = false;
           setBatchIndex(0);
           setProcessedData([]);
      };
  }, [mapRef]); //

}