import Evs from 'evs'

class Uvs extends Evs {
  constructor (...args) {
    super(...args);
    if (!args[0].startsWith('ws://')) {
      args[0] = `ws://${args[0]}`;
    }
    this.socket = new WebSocket(args[0])
    this.socket.onmessage = e => {
      let data = JSON.parse(e.data)
      this.trigger(data.name, data.message);
    }
    this.socket.onopen = e => {
      this.trigger('open', this);
    }
    this.socket.onerror = e => {
      this.trigger('error', e);
    }
    this.socket.onclose = e => {
      this.trigger('close', e);
    }
  }

  send (name, data) {
    super.send(JSON.stringify({name: name, data: data}));
  }
}
