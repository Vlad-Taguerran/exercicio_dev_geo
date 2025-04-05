import { useEffect } from "react";
import { useMarkers } from '@/application/stores/SseMarker.store';
import { EventService } from '../../../infra/event/EventService';
import { IAddressDto } from "@/application/interfaces/IAddressDto";

export function useSSEListener() {
  const sseUrl = process.env.NEXT_PUBLIC_API_SSE || '';
  const setMarkers = useMarkers.getState().setMarkers;
  //const markers = useMarkers.getState().markers;

  console.log("Markers atuais:", useMarkers.getState().markers);
  useEffect(() => {
    const sseService = new EventService();

    const handleSseMessage = (data: IAddressDto) => {
      setMarkers(data);
    };

    sseService.connect(sseUrl, handleSseMessage);

    return () => sseService.disconnect();
  }, [sseUrl]); 
}