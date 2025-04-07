import { useEffect } from "react";
import { useMarkers } from '@/application/stores/SseMarker.store';
import { EventService } from '../../../infra/event/EventService';
import { IAddressDto } from "@/application/interfaces/IAddressDto";

export function useSSEListener() {
  const sseUrl = "http://localhost:8000/event/address"
  const setMarkers = useMarkers.getState().setMarkers;

  useEffect(() => {
    const sseService = new EventService();

    const handleSseMessage = (data: IAddressDto) => {
      setMarkers(data);
    };

    sseService.connect(sseUrl, handleSseMessage);

    return () => sseService.disconnect();
  }, [sseUrl]); 
}