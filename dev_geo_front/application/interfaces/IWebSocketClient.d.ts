export interface IWebSocketClient {
  connect(): void;
  sendMessage(message: unknown): void;
  onMessage(handler: (data: unknown) => void): void;
}