'use client'
import { useEffect } from "react";
import  {WebSocketClient} from "./webSocket/WebSocketClient";

interface WebSocketData {
  batch: any; 
}

export function useWebSocket<T>(callback: (data: T) => void) {
  useEffect(() => {
   
    const client = new WebSocketClient<WebSocketData>();
    client.onMessage((data: WebSocketData) => {
      console.log("Mensagem recebida via WebSocket:", data);
      callback(data.batch); 
    });

    client.connect();

    return () => console.log("WebSocket desconectado.");
  }, [callback]);
}