import eventBus from '#app/globals/eventbus.js';

export default class Event {
  static run(...args: any[]) {
    // @ts-ignore
    let event = new this(...args);
    eventBus.emit(this.name, event);
  }
}
