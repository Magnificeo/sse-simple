import type { Response } from 'express';
import type { Client, SSEEvent } from '../types';

export default class Channel {
  clients: Map<Response, Client> = new Map();
  constructor(
    readonly id: symbol,
    readonly description: string,
  ) {}

  addClient(response: Response) {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    const client = { response, createdAt: Date.now() };
    this.clients.set(response, client);
    response.on('close', () => {
      this.removeClient(response);
    });
    return client;
  }

  removeClient(response: Response) {
    this.clients.delete(response);
  }

  writeEvent(type: string, event: SSEEvent) {
    this.clients.forEach((cl) => {
      cl.response.write(
        `event: ${type}\nid: ${event.id}\ndata: ${JSON.stringify(
          event.data,
        )}\n\n`,
      );
    });
  }
}
