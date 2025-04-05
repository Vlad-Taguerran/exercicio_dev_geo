"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const WebSocket = __importStar(require("ws"));
class WebSocketServer {
    constructor(port) {
        this.port = port;
    }
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
    sendMessageToAll(message) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
    sendMessage(client, message) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
    close() {
        console.log("Fechando o servidor WebSocket...");
        this.wss.close(() => {
            console.log("Conexão WebSocket fechada.");
        });
    }
}
exports.WebSocketServer = WebSocketServer;
