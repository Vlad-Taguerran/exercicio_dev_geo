import { mapBoxConfig } from "@/infra/config/mapBoxConfig";
import { useCallback } from "react";


export function useMapIconLoader(setIsIconLoaded: (loaded: boolean) => void) {
  return useCallback((map: mapboxgl.Map) => {
    map.loadImage(mapBoxConfig.MARKER_ICON_PATH, (error, image) => {
      if (error) {
        console.error(`❌ Erro ao carregar o ícone '${mapBoxConfig.MARKER_ICON_PATH}':`, error);
        return;
      }
      if (!image) {
        console.error(`❌ Imagem do ícone não carregada ('${mapBoxConfig.MARKER_ICON_PATH}').`);
        return;
      }
      if (!map.hasImage(mapBoxConfig.MARKER_ICON_ID)) {
        console.log(`✔️ Ícone '${mapBoxConfig.MARKER_ICON_ID}' carregado.`);
        map.addImage(mapBoxConfig.MARKER_ICON_ID, image);
      }
      setIsIconLoaded(true);
    });
  }, [setIsIconLoaded]);
}
