'use client';
import mapboxgl, { GeoJSONFeature, IControl, LngLatLike, Map } from "mapbox-gl";

import MapboxDraw, { DrawCreateEvent } from "@mapbox/mapbox-gl-draw";
import {  useEffect, useRef, useState } from "react";
import { useMapActions } from "@/application/stores/MapActions.store";
import { mapBoxConfig } from "@/infra/config/mapBoxConfig";
import { useMapIconLoader } from "./hooks/useMapIconLoader";
import { calculateStatistics } from "./hooks/calculateStatistics";

export function useMapInitialization(mapContainerRef: React.RefObject<HTMLDivElement | null>) {
  const mapInstanceRef = useRef<Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isIconLoaded, setIsIconLoaded] = useState(false);
  const setMapInstance = useMapActions((state) => state.setMapInstance);
  const loadMapIcon = useMapIconLoader(setIsIconLoaded);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    mapboxgl.accessToken = mapBoxConfig.accessToken;

    const initialize = (center: LngLatLike) => {
      try {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: mapBoxConfig.style,
          center,
          zoom: mapBoxConfig.DEFAULT_ZOOM,
        });

        map.on('load', () => {
          console.log('🗺️ Mapa carregado!');
          mapInstanceRef.current = map;
          setIsMapLoaded(true);
          setMapInstance(map);
          new mapboxgl.Marker().setLngLat(center).addTo(map);
          map.addControl(new mapboxgl.NavigationControl(), 'top-right');
          loadMapIcon(map);
        });

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: { polygon: true, trash: true },
        }) as unknown as IControl;

        map.addControl(draw, "top-left");

        map.on("draw.create", (e:DrawCreateEvent) => {
          const polygon = e.features[0];
          const polygonFeature = polygon as unknown as GeoJSONFeature;

          calculateStatistics(polygonFeature, map);
        });

        map.on('error', (e) => console.error('❌ Erro no Mapbox:', e));
      } catch (error) {
        console.error('❌ Falha ao inicializar o mapa:', error);
      }
    };

    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocation não suportado, usando posição padrão.');
      initialize(mapBoxConfig.default_position);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => initialize([coords.longitude, coords.latitude]),
      (error) => {
        console.warn('⚠️ Geolocation falhou, usando posição padrão.', error);
        initialize(mapBoxConfig.default_position);
      },
      { timeout: 5000 }
    );

    return () => {
      console.log('🧹 Removendo mapa...');
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      setIsMapLoaded(false);
      setIsIconLoaded(false);
    };
  }, [loadMapIcon, mapContainerRef, setMapInstance]);

  return { map: mapInstanceRef, isMapLoaded, isIconLoaded };
}
