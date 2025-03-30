'use client'
import mapboxgl, { LngLatLike } from "mapbox-gl";
import {mapBoxConfig} from '@/infra/config/mapBoxConfig';

import { useCallback, useEffect, useRef, useState } from "react";


 // <-- Certifique-se que este caminho está correto a partir da pasta public

export function useMapInitialization(mapContainerRef: React.RefObject<HTMLDivElement | null>) {
  const mapInstanceRef = useRef<mapboxgl.Map  | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadMapIcon = useCallback((map: { loadImage: (arg0: string, arg1: (error: any, image: any) => void) => void; hasImage: (arg0: string) => any; addImage: (arg0: string, arg1: any) => void; }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.loadImage(mapBoxConfig.MARKER_ICON_PATH, (error: any, image: any) => {
        if (error) {
            console.error(`❌ Erro ao carregar o ícone '${mapBoxConfig.MARKER_ICON_PATH}':`, error);
            // Você pode definir um fallback ou apenas não mostrar ícones
            return;
        }
        if (!image) {
             console.error(`❌ Imagem do ícone não carregada ('${mapBoxConfig.MARKER_ICON_PATH}').`);
             return;
        }
        if (!map.hasImage(mapBoxConfig.MARKER_ICON_ID)) { // Evita adicionar a mesma imagem múltiplas vezes
             console.log(`✔️ Ícone '${mapBoxConfig.MARKER_ICON_ID}' carregado.`);
             map.addImage(mapBoxConfig.MARKER_ICON_ID, image);
             setIsIconLoaded(true); // <-- Sinaliza que o ícone está pronto
        } else {
             setIsIconLoaded(true); // Ícone já existia
        }

    });
}, []); 

  useEffect(() => {
      if (!mapContainerRef.current || mapInstanceRef.current) return; // Executa só uma vez

      mapboxgl.accessToken = mapBoxConfig.accessToken;

      const initialize = (center: LngLatLike) => {
          try {
              const map = new mapboxgl.Map({
                  container: mapContainerRef.current!,
                  style: mapBoxConfig.style,
                  center: center,
                  zoom: mapBoxConfig.DEFAULT_ZOOM,
              });

              map.on('load', () => {
                  console.log('🗺️ Mapa carregado!');
                  mapInstanceRef.current = map;
                  setIsMapLoaded(true);
                  // Opcional: Marcador inicial (se realmente necessário)
                   new mapboxgl.Marker().setLngLat(center).addTo(map);
                  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
                  loadMapIcon(map);
              });

              map.on('error', (e) => console.error('❌ Erro no Mapbox:', e));

          } catch (error) {
              console.error('❌ Falha ao inicializar o mapa:', error);
          }
      };

      // Se não obter geolocalização
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

      // Função de limpeza
      return () => {
          console.log('🧹 Removendo mapa...');
          mapInstanceRef.current?.remove();
          mapInstanceRef.current = null;
          setIsMapLoaded(false);
          setIsIconLoaded(false);
      };
  }, [loadMapIcon, mapContainerRef]); // Depende apenas da ref do container

  return { map: mapInstanceRef, isMapLoaded, isIconLoaded };
}