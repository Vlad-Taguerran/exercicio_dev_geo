
export interface WebSocketInterface{
  sendMessageToAll(message: string): void;
  sendMessage(client: WebSocket, message: string): void;
  close(): void ;
  start() : void;
}