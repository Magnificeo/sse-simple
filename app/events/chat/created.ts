import Event from '#app/core/event.js';
import { type Message } from '@prisma/client';

export default class MessageCreatedEvent extends Event {
  static override name = Symbol('MessageCreatedEvent');

  constructor(readonly message: Message) {
    super();
  }
}
