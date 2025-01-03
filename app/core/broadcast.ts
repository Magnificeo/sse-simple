import Channel from '#app/core/sse-channel.js';

export default class Broadcast {
  channels: Record<symbol, Channel> = {};
  ids: Array<symbol> = [];

  createChannel(description: string) {
    const id = Symbol(description);
    const channel = new Channel(id, description);
    this.ids.push(id);
    this.channels[id] = channel;
    return channel;
  }
}
