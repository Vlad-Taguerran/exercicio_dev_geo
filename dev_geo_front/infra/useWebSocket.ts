'use client'
import { useEffect } from "react";
import  {WebSocketClient} from "./webSocket/WebSocketClient";


export function useWebSocket<T>(url: string, callback: (data: T) => void) {
  useEffect(() => {
    const client = new WebSocketClient<T>(url);
    client.onMessage(callback);
    client.connect();

    return () => console.log("WebSocket desconectado.");
  }, [url, callback]);
}