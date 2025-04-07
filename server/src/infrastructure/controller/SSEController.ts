import { Response } from 'express';
import { logInfo } from '../config/logHelpers';

class SSEController {
  private clients: Response[] = [];

  public connect(req: any, res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    this.clients.push(res);
    
    req.on('close', () => {
      this.clients = this.clients.filter(client => client !== res);
    });
  }

  public notify(event: object): void {
    logInfo(`${event} Event`,)
    const message = `data: ${JSON.stringify(event)}\n\n`;
    this.clients.forEach(client => client.write(message));
  }
}

export const sseController = new SSEController();
