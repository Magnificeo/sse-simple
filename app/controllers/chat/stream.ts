import eventBus from '#app/globals/eventbus.js';
import broadcast from '#app/globals/broadcast.js';
import type { Request, Response } from 'express';
import prismaClient from '#app/globals/prismaClient.js';
import MessageCreatedEvent from '#app/events/chat/created.js';
import type { SSEEvent } from '#app/types/index.js';
import type { Message } from '@prisma/client';

const events: SSEEvent[] = [];
let eventId = 0;

const channel = broadcast.createChannel('Chat SSE');

eventBus.on(MessageCreatedEvent.name, (e) => {
  const event = { data: e.message, id: ++eventId };
  events.push(event);
  channel.writeEvent('messageCreated', event);
});

export default async (request: Request, response: Response) => {
  const lastEventId = parseInt(
    (request.headers['last-event-id'] as string) ?? '0',
  );

  let msgs: Message[] = [];

  if (lastEventId === 0) {
    msgs = await prismaClient.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  const client = channel.addClient(response);

  if (lastEventId === 0) {
    return client.response.write(
      `event: init\nretry: 25000\ndata: ${JSON.stringify({ messages: msgs })}\n\n`,
    );
  }

  const newEvents = events.filter((e) => {
    return e.id > lastEventId;
  });

  return newEvents.forEach((e) => {
    client.response.write(
      `event: messageCreated\ndata: ${JSON.stringify(e.data)}\n\n`,
    );
  });
};
