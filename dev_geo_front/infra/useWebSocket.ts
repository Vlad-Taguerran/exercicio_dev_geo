'use client'
import { useEffect } from "react";
import  {WebSocketClient} from "./webSocket/WebSocketClient";


export function useWebSocket<T>(callback: (data: T) => void) {
  useEffect(() => {
    const client = new WebSocketClient<T>();
    client.onMessage(callback);
    client.connect();

    return () => console.log("WebSocket desconectado.");
  }, [callback]);
}