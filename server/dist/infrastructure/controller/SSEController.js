"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sseController = void 0;
class SSEController {
    constructor() {
        this.clients = [];
    }
    connect(req, res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        this.clients.push(res);
        req.on('close', () => {
            this.clients = this.clients.filter(client => client !== res);
        });
    }
    notify(event) {
        const message = `data: ${JSON.stringify(event)}\n\n`;
        this.clients.forEach(client => client.write(message));
    }
}
exports.sseController = new SSEController();
