import * as WebSocket from 'ws';
import { WebSocketInterface } from '../../aplication/interfaces/WebSocket';

export class WebSocketServer implements WebSocketInterface {
  private wss!: WebSocket.Server;

  constructor(private port: number) {}

  start() {
    this.wss = new WebSocket.Server({ port: this.port });
    console.log(`WebSocket server is running on ws://localhost:${this.port}`);

    this.wss.on('connection', (ws) => {
      console.log('Novo cliente conectado');
      
      ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);
      });
    });
  }

  sendMessageToAll(message: string) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  sendMessage(client: globalThis.WebSocket, message: string) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }

  close(): void {
    console.log("Fechando o servidor WebSocket...");
    this.wss.close(() => {
      console.log("Conexão WebSocket fechada.");
    });
  }
}