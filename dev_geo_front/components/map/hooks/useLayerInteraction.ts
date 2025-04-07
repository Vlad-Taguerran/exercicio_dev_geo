import { useCallback, useEffect, useRef } from "react";
import { MapMouseEvent } from "mapbox-gl";
import { ICensusPointDto } from "@/application/interfaces/ICensusPointDto";
import { useMapActions } from "@/application/stores/MapActions.store";
import { mapBoxConfig } from "@/infra/config/mapBoxConfig";
import { GeoJsonProperties } from '@/types/GeoJsonProperties';
import { calcularEstatisticas } from "./utils";

//Interação com as leyars
function useLayerInteraction(
  setSelectedPoint: (censusData: ICensusPointDto) => void,
   convertToIcensuPoint: (properties: GeoJsonProperties, coordinates: [number, number]) => ICensusPointDto,
  changeDrawereState: () => void
) {
  const lastSelectedPoint = useRef<ICensusPointDto | null>(null);
  const currentMap = useMapActions.getState().mapInstance;
  const handleFeatureClick = useCallback(
    (e: MapMouseEvent & { features?: GeoJSON.Feature[] }) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      if (feature.geometry.type !== "Point" || !feature.properties) return;

      const properties = feature.properties as GeoJsonProperties;
      const coordinates = feature.geometry.coordinates as [number, number];
      const selectedPoint = convertToIcensuPoint(properties, coordinates);

      if (lastSelectedPoint.current && JSON.stringify(lastSelectedPoint.current) === JSON.stringify(selectedPoint)) {
        return;
      }

console.log(feature)
      if (feature.properties.cluster_id) {
        const source = currentMap?.getSource(mapBoxConfig.SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
        if (!source) {
          console.warn("⚠️ Fonte do mapa não encontrada:", mapBoxConfig.SOURCE_ID);
          return;
        }
          console.error("❌ A fonte não suporta getClusterLeaves:", source);
          return;
        }
      
const source = currentMap?.getSource(mapBoxConfig.SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;

source?.getClusterLeaves(
  feature.properties.cluster_id,
  1000,
  0,
  (err, leaves) => {
    console.log("📌 Dados do cluster:", leaves);
    const pontos = leaves ?? [];
    const estatisticas = calcularEstatisticas(pontos);
    console.log("📊 Estatísticas do Cluster:", estatisticas);
  }
    );


      lastSelectedPoint.current = selectedPoint;
      setSelectedPoint(selectedPoint);
      changeDrawereState();
    },
    [convertToIcensuPoint, currentMap, setSelectedPoint, changeDrawereState]
  );

  
  const handleMouseEnter = useCallback((e:MapMouseEvent) => {
    e.target.getCanvas().style.cursor = "pointer";
  }, []);

  const handleMouseLeave = useCallback((e:MapMouseEvent) => {
    e.target.getCanvas().style.cursor = "";
  }, []);

  useEffect(() => {
    const currentMap = useMapActions.getState().mapInstance;
    if (!currentMap) return;
    currentMap.on("clusters-circle","clusters-circle",handleFeatureClick);
    currentMap.on("click", mapBoxConfig.LAYER_ID,handleFeatureClick);
    currentMap.on("mouseenter", mapBoxConfig.LAYER_ID, handleMouseEnter);
    currentMap.on("mouseleave", mapBoxConfig.LAYER_ID, handleMouseLeave);

    return () => {
      currentMap.off("click", mapBoxConfig.LAYER_ID,handleFeatureClick);
      currentMap.off("mouseenter", mapBoxConfig.LAYER_ID, handleMouseEnter);
      currentMap.off("mouseleave", mapBoxConfig.LAYER_ID, handleMouseLeave);
    };
  }, [handleFeatureClick, handleMouseEnter, handleMouseLeave]);

  return null;
}

export default useLayerInteraction;
