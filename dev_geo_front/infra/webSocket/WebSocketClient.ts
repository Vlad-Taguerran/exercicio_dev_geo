import { IWebSocketClient } from "@/application/interfaces/IWebSocketClient";

export class WebSocketClient<T> implements IWebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private messageCallback: ((data: T) => void) | null = null;
  
  constructor(url: string) {
    this.url = url;
  }
 
  connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket conectado");
    };

   this.socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as T; 
      console.log("DADOS CHEGANDO:: " +data)
      if (this.messageCallback) {
        this.messageCallback(data);
      }
    } catch (error) {
      console.error("Erro ao processar mensagem WebSocket:", error);
    }
  };

 
    this.socket.onclose = () => {
      console.warn("WebSocket desconectado, tentando reconectar...");
      setTimeout(() => this.connect(), 3000); // Reconectar após 3s
    };
  }


  sendMessage(message: T): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket não está conectado.");
    }
  }

  onMessage(callback: (data: T) => void): void {
    this.messageCallback = callback;
  }

}