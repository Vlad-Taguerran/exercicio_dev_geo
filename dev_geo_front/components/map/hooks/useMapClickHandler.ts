import { useCallback, useEffect, useRef } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import { useMapActions } from "@/application/stores/MapActions.store";
import markerService from "@/application/services/MarkerService.service";
import { useLocationStore } from "@/application/stores/Location.store";

function useMapClickHandler() {
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Armazena todos os pinos

  const pinMapState = useMapActions((state) => state.pinMapState);
  const modalState = useLocationStore((state)=> state.modalState)
  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!pinMapState) return;

      const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      markerService(coordinates);
      const currentMap = useMapActions.getState().mapInstance;
      if (currentMap) {
        // Crie um novo marcador
       const tempMarker = new mapboxgl.Marker() // Certifique-se de que mapboxgl está importado no seu componente
          .setLngLat(coordinates)
          .addTo(currentMap);
          markersRef.current.push(tempMarker)
        console.log("📍 PINO ADICIONADO:", coordinates);
      } else {
        console.error("Instância do mapa não encontrada para adicionar o marcador.");
      }
     
      console.log("📍 Clique no mapa:", coordinates);
    },
    
    [pinMapState]
  );
  useEffect(() => {
    if (!modalState) {
      // Remove todos os pinos ao fechar o modal
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      console.log("❌ Todos os pinos foram removidos!");
    }
  }, [modalState]);

  useEffect(() => {
    const currentMap = useMapActions.getState().mapInstance;
    if (!currentMap) return;

    currentMap.on("click", handleMapClick);

    return () => {
      currentMap.off("click", handleMapClick);
    };
  }, [handleMapClick]);

  return null; 
  
}

export default useMapClickHandler;
