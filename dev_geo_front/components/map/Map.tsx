'use client'
import { useWebSocket } from "@/infra/useWebSocket";
import { useMapDataProcessing } from "./useMapDataProcessing";
import { useCensuStore } from "@/application/stores/Census.store";
import { useEffect, useRef } from "react";
import { useMapInitialization } from "./useMapInitialization";
import { Stack } from "@mui/material";
import { useSSEMarkers } from "./hooks/useSSEMarkers";
import { findAllAddresAction } from "@/application/actions/LocationAction";
import { useMarkers } from "@/application/stores/SseMarker.store";
import { useSSEListener } from "./hooks/useSSEListener";



export const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { setData, censusCsv } = useCensuStore();
 
  useWebSocket(setData);
  useSSEMarkers();
  useSSEListener();
  const {setMarkersByUser} = useMarkers();
  const { map: mapRef, isMapLoaded, isIconLoaded  } = useMapInitialization(mapContainerRef);

  useMapDataProcessing(mapRef, isMapLoaded, censusCsv,isIconLoaded);
  useEffect(()=>{
   async function LoadMarkers() {
    const markers = await findAllAddresAction();
    if(markers){
      setMarkersByUser(markers)
    }
    
   }
   LoadMarkers();
  },[])
  
  return (
      
      <Stack
          ref={mapContainerRef}
          sx={{flex: 1, border: 0, width:'100%', height:'100%'}}
          
      />
      
  );
};
