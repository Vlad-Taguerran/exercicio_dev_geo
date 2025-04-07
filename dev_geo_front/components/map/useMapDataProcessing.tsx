"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Map, GeoJSONSource } from "mapbox-gl";
// Usando suas importações reais
import { mapBoxConfig } from "@/infra/config/mapBoxConfig";
import { ICensusPoint } from "@/application/interfaces/ICensusPoint";
import { useDrawereData } from "@/application/stores/DrawereData";
import { ICensusPointDto } from "@/application/interfaces/ICensusPointDto";
import { useMapActions } from "@/application/stores/MapActions.store";
import useLayerInteraction from "./hooks/useLayerInteraction";
// Importando GeoJsonProperties do pacote geojson para melhor tipagem se disponível
// Se não, pode usar a definição que estava antes ou any
import type { Point, FeatureCollection, GeoJsonProperties } from "geojson";
import useMapClickHandler from "./hooks/useMapClickHandler";

// criar a estrutura GeoJSON (mantida, com pequena melhoria na conversão de propriedade)
const createGeoJsonFeatureCollection = (
  data: ICensusPoint[]
): FeatureCollection<Point, GeoJsonProperties> => {
  return {
    type: "FeatureCollection",
    features: data.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude],
      },
      properties: Object.keys(point)
        .filter((key) => key !== "longitude" && key !== "latitude")
        .reduce((obj: GeoJsonProperties, key) => {
          // Tipagem explícita do acumulador
          const value = point[key as keyof ICensusPoint];
          // Converte string para float, senão usa o número, default para 0 se inválido/não numérico
          const numValue =
            typeof value === "string"
              ? parseFloat(value)
              : typeof value === "number"
              ? value
              : NaN;
          obj![key] = isNaN(numValue) ? 0 : numValue;
          return obj;
        }, {}), // Inicializa como objeto vazio, o tipo é inferido ou pode ser explicitado
    })),
  };
};

export function useMapDataProcessing(
  mapRef: React.RefObject<Map | null>,
  isMapLoaded: boolean,
  censusData: ICensusPoint[],
  isIconLoaded: boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [batchIndex, setBatchIndex] = useState(0);
  const [processedData, setProcessedData] = useState<ICensusPoint[]>([]);
  const [allDataProcessed, setAllDataProcessed] = useState(false); // <-- NOVO ESTADO

  const { setSelectedPoint } = useDrawereData();
  const { changeDrawereState } = useMapActions();

  const isProcessingComplete = useRef(false);
  const sourceExists = useRef(false);
  const clusterCircleLayerExists = useRef(false);
  const clusterTextLayerExists = useRef(false);
  const unclusteredLayerExists = useRef(false);

  // Função para converter propriedades GeoJSON de volta para seu DTO (mantida)
  const convertToICensusPoint = useCallback(
    (
      properties: GeoJsonProperties,
      coordinates: [number, number]
    ): ICensusPointDto => {
      // console.log(" Propriedades recebidas para conversão DTO:", properties);
      // console.log(" Coordenadas recebidas para conversão DTO:", coordinates);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dto: any = {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      // As propriedades já devem ser números devido ao createGeoJsonFeatureCollection
      for (const key in properties) {
        // Verifica se a propriedade pertence ao objeto e não é herdada
        if (Object.prototype.hasOwnProperty.call(properties, key)) {
          const value = properties[key]; // Acessa diretamente
          dto[key] = typeof value === "number" ? value : 0; // Garante que seja número, default 0
        }
      }
      return dto as ICensusPointDto;
    },
    []
  ); // Sem dependências externas

  // Função para configurar a fonte e as camadas (chamada apenas uma vez no final)
  const setupSourceAndLayer = useCallback(
    (currentMap: Map, data: ICensusPoint[]) => {
      if (!data || data.length === 0) {
        console.warn("⚠️ Tentativa de configurar fonte/camadas sem dados.");
        return;
      }
      const geoJsonData = createGeoJsonFeatureCollection(data);
      console.log(`ℹ️ Configurando fonte com ${data.length} pontos.`);

      // --- FONTE (SOURCE) ---
      // Nesta abordagem, a fonte não deve existir ainda, mas checar é seguro.
      const existingSource = currentMap.getSource(mapBoxConfig.SOURCE_ID) as
        | GeoJSONSource
        | undefined;

      if (!existingSource && !sourceExists.current) {
        try {
          console.log(
            `➕ Adicionando fonte '${mapBoxConfig.SOURCE_ID}' com clustering...`
          );
          currentMap.addSource(mapBoxConfig.SOURCE_ID, {
            type: "geojson",
            data: geoJsonData,
            cluster: true,
            clusterRadius: 50, // Usar valor do config ou default
            clusterMaxZoom: 14, // Usar valor do config ou default
            clusterProperties: {
              // Usar 'coalesce' para garantir que o valor seja 0 se a propriedade não existir no ponto
              sum_particular: [
                "+",
                [
                  "coalesce",
                  ["get", "censo_2022_domicilio_particular_poi_counts"],
                  0,
                ],
              ],
              sum_agro: [
                "+",
                [
                  "coalesce",
                  ["get", "censo_2022_estabelecimento_agro_poi_counts"],
                  0,
                ],
              ],
              sum_construcao: [
                "+",
                [
                  "coalesce",
                  ["get", "censo_2022_estabelecimento_construcao_poi_counts"],
                  0,
                ],
              ],
              // Adicione outras propriedades de cluster conforme necessário
            },
          });
          sourceExists.current = true; // Marca que a fonte foi adicionada
          console.log(`✅ Fonte '${mapBoxConfig.SOURCE_ID}' adicionada.`);
        } catch (error) {
          console.error(
            `❌ Erro ao adicionar fonte '${mapBoxConfig.SOURCE_ID}':`,
            error
          );
          sourceExists.current = false; // Garante que o ref está falso se falhar
          // Não re-lança o erro aqui para permitir que a adição das camadas seja tentada se a fonte já existia de alguma forma
          return; // Interrompe a configuração se a adição da fonte falhar
        }
      } else if (existingSource) {
        console.warn(
          `⚠️ Fonte '${mapBoxConfig.SOURCE_ID}' já existia. Atualizando dados (inesperado nesta abordagem).`
        );
        existingSource.setData(geoJsonData);
        sourceExists.current = true; // Garante que o ref está true
      } else {
        // Ref diz que existe, mas getSource não encontrou? Estranho.
        console.warn(
          `⚠️ Inconsistência: Ref sourceExists=true, mas getSource('${mapBoxConfig.SOURCE_ID}') falhou.`
        );
        // Força a tentativa de adição tratando como se não existisse
        sourceExists.current = false;
        setupSourceAndLayer(currentMap, data); // Chama recursivamente (cuidado com loops infinitos) - ou apenas loga
        return; // Evita processamento adicional nesta chamada
      }

      // --- CAMADAS (LAYERS) ---
      // Adiciona as camadas APENAS se a fonte foi confirmada/adicionada e o ícone está pronto
      if (sourceExists.current && isIconLoaded) {
        console.log("➕ Tentando adicionar camadas...");

        // 1. Camada de CÍRCULO para Clusters
        if (
          !clusterCircleLayerExists.current &&
          !currentMap.getLayer("clusters-circle")
        ) {
          const layerId = "clusters-circle";
          try {
            console.log(`   -> Adicionando camada '${layerId}'...`);
            currentMap.addLayer({
              id: layerId,
              type: "circle",
              source: mapBoxConfig.SOURCE_ID,
              filter: ["has", "point_count"],
              paint: {
                "circle-color": [
                  "step",
                  ["get", "point_count"],
                  "#51bbd6",
                  100,
                  "#f1f075",
                  750,
                  "#e66475",
                ], // Exemplo de cores/passos
                "circle-radius": [
                  "step",
                  ["get", "point_count"],
                  20,
                  100,
                  30,
                  750,
                  40,
                ], // Exemplo de raios/passos
           
              },
              maxzoom: 100// Controla o nível máximo de zoom onde os clusters ainda existem

             
            });
            clusterCircleLayerExists.current = true;
            console.log(`   ✅ Camada '${layerId}' adicionada.`);
          } catch (error) {
            console.error(
              `   ❌ Erro ao adicionar camada '${layerId}':`,
              error
            );
          }
        }

        // 2. Camada de TEXTO para Clusters
        if (
          !clusterTextLayerExists.current &&
          !currentMap.getLayer("cluster-count-text")
        ) {
          const layerId = "cluster-count-text";
          try {
            console.log(`   -> Adicionando camada '${layerId}'...`);
            currentMap.addLayer({
              id: layerId,
              type: "symbol",
              source: mapBoxConfig.SOURCE_ID,
              filter: ["has", "point_count"],
            });
            clusterTextLayerExists.current = true;
            console.log(`   ✅ Camada '${layerId}' adicionada.`);
          } catch (error) {
            console.error(
              `   ❌ Erro ao adicionar camada '${layerId}':`,
              error
            );
          }
        }

        // 3. Camada de ÍCONES para Pontos INDIVIDUAIS (Não Clusterizados)
        if (
          !unclusteredLayerExists.current &&
          !currentMap.getLayer(mapBoxConfig.LAYER_ID)
        ) {
          // Usa LAYER_ID do config
          const layerId = mapBoxConfig.LAYER_ID;
          if (!layerId) {
            console.error("❌ mapBoxConfig.LAYER_ID não está definido!");
            return;
          }
          try {
            console.log(
              `   -> Adicionando camada '${layerId}' (pontos individuais)...`
            );
            currentMap.addLayer({
              id: layerId,
              type: "symbol",
              source: mapBoxConfig.SOURCE_ID,
              filter: ["!", ["has", "point_count"]],
              layout: {
                "icon-image": mapBoxConfig.MARKER_ICON_ID, // ID do ícone previamente adicionado ao mapa
                "icon-size": 0.9, // Tamanho do ícone
                "icon-allow-overlap": false,
                "icon-ignore-placement": false,
                "icon-anchor": "bottom",
              },
            });
            unclusteredLayerExists.current = true;
            console.log(`   ✅ Camada '${layerId}' adicionada.`);
          } catch (error) {
            console.error(
              `   ❌ Erro ao adicionar camada '${layerId}':`,
              error
            );
          }
        }
      } else {
        if (!sourceExists.current)
          console.log(
            "ℹ️ Fonte não existe ou falhou ao adicionar, pulando adição de camadas."
          );
        if (!isIconLoaded)
          console.log("ℹ️ Ícone não carregado, pulando adição de camadas.");
      }
      // Depende de isIconLoaded para adicionar camadas e da função de criação do GeoJSON
    },
    [isIconLoaded, createGeoJsonFeatureCollection]
  );

  // Hooks de interação e mouse (mantidos como estavam - usando os reais importados)
  useLayerInteraction(
    setSelectedPoint,
    convertToICensusPoint,
    changeDrawereState
  );
  useMapClickHandler();

  // --- EFEITOS ---

  // Efeito para ACUMULAR dados em lotes (NÃO configura mais o mapa aqui)
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded || censusData.length === 0) {
      // Se não há mapa, não está carregado ou não há dados, não faz nada.
      // Se já está completo, também não faz nada.
      if (isProcessingComplete.current) {
        console.log("ℹ️ Dados já processados anteriormente.");
      }
      return;
    }

    // --- Resetar estado se os dados ou o status do mapa mudarem ---
    // Isso garante que se novos dados chegarem, o processo recomece.
    console.log(
      "🔄 Detectada mudança em dados/mapa. Resetando estado de processamento."
    );
    setProcessedData([]);
    setBatchIndex(0);
    setAllDataProcessed(false);
    isProcessingComplete.current = false;
    // NÃO resetar os refs de existência de source/layer aqui, a limpeza geral cuida disso.

    console.log(`⏳ Iniciando ACUMULAÇÃO de ${censusData.length} pontos...`);
    const intervalId = setInterval(() => {
      // Usar forma funcional do setState para garantir acesso ao valor mais recente
      setBatchIndex((currentIndex) => {
        const start = currentIndex * mapBoxConfig.BATCH_SIZE;

        if (start >= censusData.length) {
          // --- Processamento Concluído ---
          if (!isProcessingComplete.current) {
            // Evita logs/sets repetidos
            console.log("✅ Acumulação de lotes concluída!");
            isProcessingComplete.current = true;
            setAllDataProcessed(true); // <-- Sinaliza para o próximo efeito
            clearInterval(intervalId); // Limpa o intervalo AQUI
          }
          return currentIndex; // Mantém o índice atual
        }

        const end = Math.min(
          start + mapBoxConfig.BATCH_SIZE,
          censusData.length
        );
        const newBatch = censusData.slice(start, end);

        if (newBatch.length > 0) {
          // Acumula o novo lote
          setProcessedData((prev) => [...prev, ...newBatch]);
          // Retorna o próximo índice para o estado
          return currentIndex + 1;
        } else {
          // --- Lote Vazio (Fim inesperado?) ---
          if (!isProcessingComplete.current) {
            console.warn(
              "⚠️ Lote vazio encontrado antes do fim dos dados. Considerando concluído."
            );
            isProcessingComplete.current = true;
            setAllDataProcessed(true); // <-- Sinaliza para o próximo efeito
            clearInterval(intervalId); // Limpa o intervalo AQUI
          }
          return currentIndex; // Mantém o índice atual
        }
      });
    }, mapBoxConfig.BATCH_INTERVAL_MS || 100); // Usa valor do config ou default

    // --- Função de Limpeza para este efeito ---
    return () => {
      console.log("🧹 Limpando intervalo de acumulação de lotes...");
      clearInterval(intervalId);
      // Reseta flags de controle caso o efeito seja limpo ANTES da conclusão
      // Não reseta os dados processados aqui.
      isProcessingComplete.current = false;
      setAllDataProcessed(false);
    };
    // Dependências: Recomeça se o mapa mudar, o status de carregado mudar, ou os dados mudarem.
  }, [mapRef, isMapLoaded, censusData]); // Removidas outras dependências desnecessárias aqui

  // NOVO Efeito para configurar o mapa APÓS todos os dados serem processados
  useEffect(() => {
    // Só executa se TODOS os dados foram processados E as condições do mapa/ícone estiverem OK
    if (
      allDataProcessed &&
      mapRef.current &&
      isMapLoaded &&
      isIconLoaded &&
      processedData.length > 0
    ) {
      // Verifica se a fonte já foi adicionada (para evitar re-execução desnecessária)
      if (sourceExists.current) {
        console.log(
          "ℹ️ Fonte/camadas já configuradas anteriormente (pós processamento)."
        );
        return;
      }

      console.log(
        `🚀 Configurando fonte e camadas com TODOS os ${processedData.length} pontos...`
      );
      try {
        const currentMap = mapRef.current;
        if (currentMap.isStyleLoaded()) {
          // Chama a função principal de configuração UMA VEZ
          setupSourceAndLayer(currentMap, processedData);
        } else {
          // Fallback: Se o estilo não carregou ainda (embora isMapLoaded devesse cobrir isso)
          console.warn(
            "⚠️ Estilo do mapa não carregado ao tentar configurar fonte/camadas finais. Adicionando listener 'styledata'..."
          );
          const onStyleData = () => {
            console.log("   -> Evento 'styledata' recebido.");
            // Re-verifica todas as condições antes de tentar configurar
            if (
              allDataProcessed &&
              mapRef.current &&
              isIconLoaded &&
              processedData.length > 0 &&
              !sourceExists.current
            ) {
              console.log("      -> Tentando configurar após 'styledata'...");
              setupSourceAndLayer(mapRef.current, processedData);
            } else {
              console.log(
                "      -> Condições não atendidas ou já configurado após 'styledata'."
              );
            }
            // Remove o listener após a primeira tentativa para evitar múltiplas chamadas
            currentMap.off("styledata", onStyleData);
          };
          currentMap.once("styledata", onStyleData); // 'once' para executar apenas uma vez
        }
      } catch (error) {
        console.error(
          "❌ Erro durante o setup final (pós processamento) de SourceAndLayer:",
          error
        );
        // Resetar refs pode ajudar a tentar novamente em caso de erro crítico
        sourceExists.current = false;
        clusterCircleLayerExists.current = false;
        clusterTextLayerExists.current = false;
        unclusteredLayerExists.current = false;
      }
    } else if (allDataProcessed && processedData.length === 0) {
      console.warn(
        "⚠️ Processamento concluído, mas não há dados processados para exibir."
      );
    }
    // Dependências: Executa quando 'allDataProcessed' se torna true, ou se mapa/ícone/dados
    // mudarem DEPOIS que 'allDataProcessed' já for true.
  }, [
    allDataProcessed,
    processedData,
    mapRef,
    isMapLoaded,
    isIconLoaded,
    setupSourceAndLayer,
  ]);

  // Efeito de Limpeza Geral (ao desmontar o componente)
  useEffect(() => {
    // Retorna a função de limpeza
    return () => {
      console.log("🧹 Limpando TUDO ao desmontar...");
      // Reseta estados
      setBatchIndex(0);
      setProcessedData([]);
      setAllDataProcessed(false); // Resetar novo estado

      // Reseta refs de controle
      isProcessingComplete.current = false;
      sourceExists.current = false;
      clusterCircleLayerExists.current = false;
      clusterTextLayerExists.current = false;
      unclusteredLayerExists.current = false;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const map = mapRef.current; // Captura o valor atual da ref
      if (map) {
        try {
          console.log("   -> Removendo camadas e fonte...");
          // IDs das camadas baseados no config ou defaults usados em setupSourceAndLayer
          
          const clusterLayerId = mapBoxConfig.CLUSTER_LAYER_ID || "clusters-circle";
          const clusterCountLayerId =mapBoxConfig.CLUSTER_COUNT_LAYER_ID || "cluster-count-text";
          const unclusteredLayerId = mapBoxConfig.LAYER_ID;

          if (map.getLayer(clusterCountLayerId))
            map.removeLayer(clusterCountLayerId);
          if (map.getLayer(clusterLayerId)) map.removeLayer(clusterLayerId);
          if (unclusteredLayerId && map.getLayer(unclusteredLayerId))
            map.removeLayer(unclusteredLayerId);
          if (map.getSource(mapBoxConfig.SOURCE_ID))
            map.removeSource(mapBoxConfig.SOURCE_ID);
          console.log("   ✅ Camadas e fonte removidas.");
        } catch (e) {
          console.warn(
            "   ⚠️ Warn: Erro durante a limpeza de camadas/fonte no desmontar (pode ser normal se o mapa já foi destruído):",
            e
          );
        }
      } else {
        console.log(
          "   ℹ️ Ref do mapa não disponível no desmontar, limpeza de camadas/fonte pulada."
        );
      }
    };
  }, [mapRef]); // Dependência em mapRef para capturar o valor correto na limpeza.

  // Pode retornar um estado de carregamento se necessário
  // return { isLoading: !allDataProcessed && censusData.length > 0 };
}
