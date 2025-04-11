import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useMapActions } from "@/application/stores/MapActions.store";
import { useMarkers } from '@/application/stores/SseMarker.store';
import { IAddressDto } from "@/application/interfaces/IAddressDto";

export function useSSEMarkers() {
  const mapInstance = useMapActions((state) => state.mapInstance);
  const markers = useMarkers((state) => state.markers);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  
  useEffect(() => {
    if (!mapInstance) return;
    if (markers.length === 0) {
      
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();
      console.log("Store de markers está vazia, limpando mapa.");
      return;
   }

    markers.forEach((data: IAddressDto) => {

      const { id, house_number, address, city, state, postcode, latitude, longitude } = data;

      const popupContent = `
        <div style="padding: 10px; color: black;">
          <h3>Detalhes do Endereço</h3>
          <p>🏠 <b>Número:</b> ${house_number || 'Não informado'}</p>
          <p>📍 <b>Endereço:</b> ${address || 'Não informado'}</p>
          <p>📍 <b>Cidade:</b> ${city || 'Não informado'}</p>
          <p>📍 <b>Estado:</b> ${state || 'Não informado'}</p>
          <p>📍 <b>CEP:</b> ${postcode || 'Não informado'}</p>
          <p>🌐 <b>Latitude:</b> ${latitude}</p>
          <p>🌐 <b>Longitude:</b> ${longitude}</p>
        </div>
      `;

      if (markersRef.current.has(id)) {
        markersRef.current.get(id)?.setLngLat([Number(longitude), Number(latitude)]);
      } else {

        const newMarker = new mapboxgl.Marker()
          .setLngLat([Number(longitude), Number(latitude)])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(mapInstance);

        const markerElement = newMarker.getElement();
        markerElement.style.cursor = 'pointer';
        markerElement.addEventListener("click", (e) => {
          e.stopPropagation();
          newMarker.togglePopup();
        });

        markersRef.current.set(id, newMarker);
      }
    });

    return () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();
    };
  }, [markers,mapInstance]);

  return { markers: markersRef.current };
}
