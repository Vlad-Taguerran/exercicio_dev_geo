'use client'
import { useEffect } from "react";
import  {WebSocketClient} from "./webSocket/WebSocketClient";


export function useWebSocket<T>(callback: (data: T) => void) {
  useEffect(() => {
   
    const client = new WebSocketClient<T>();
    client.onMessage((data: T) => {
      console.log("Mensagem recebida via WebSocket:", data); // ✅ AQUI você tem acesso ao `data`
      callback(data.batch); // repassa pro callback original
    });

    client.connect();

    return () => console.log("WebSocket desconectado.");
  }, [callback]);
}