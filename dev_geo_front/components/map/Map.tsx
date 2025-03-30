'use client'
import { useWebSocket } from "@/infra/useWebSocket";
import { useMapDataProcessing } from "./useMapDataProcessing";
import { useCensuStore } from "@/application/stores/Census.store";
import { useRef } from "react";
import { useMapInitialization } from "./useMapInitialization";
import { Box } from "@mui/material";


export const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { setData, censusCsv } = useCensuStore();

  // Conecta ao WebSocket (idealmente, isso poderia estar dentro do store)
  useWebSocket("ws://localhost:8081", setData);

  // Hook para inicializar o mapa base
  const { map: mapRef, isMapLoaded, isIconLoaded  } = useMapInitialization(mapContainerRef);

  // Hook para processar os dados do censo e adicionar ao mapa
  useMapDataProcessing(mapRef, isMapLoaded, censusCsv,isIconLoaded);

  return (
      <Box
          ref={mapContainerRef}
          sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}
          aria-label="Mapa interativo com dados do censo" // Acessibilidade
      />
  );
};
