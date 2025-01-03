import MessageCreatedEvent from '#app/events/chat/created.js';
import type { Request, Response } from 'express';
import prismaClient from '#app/globals/prismaClient.js';
import { z } from 'zod';

const messageSchema = z.object({
  username: z.string(),
  text: z.string(),
});

export default async (request: Request, response: Response) => {
  try {
    const parsedBody = messageSchema.parse(request.body);
    const message = await prismaClient.message.create({
      data: parsedBody,
    });
    MessageCreatedEvent.run(message);
    response.json(true);
  } catch (e) {
    console.error(e);
    response.status(500).end('error');
  }
};
