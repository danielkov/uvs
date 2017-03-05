const UWSS = require('uws').Server;
const Evs = require('evs');
const { parameters } = require('./decorators');

module.exports = class Server extends Evs {
  constructor(opts) {
    super();
    this.server = new UWSS(opts);
    this.sockets = [];
    this.server.on('connection', ws => {
      let socket = new Socket(ws, this._genId(), this);
      this.sockets.push(socket);
      this.trigger('connection', socket);
    })
  }

  _genId () {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  //@parameters('string', 'any', 'optional')
  send (name, data, opts) {
    let o = opts || {}
    let options = {
      to: o.to || false,
      exclude: o.exclude || false
    }
    if (options.to) {
      if (options.to instanceof Socket) {
        options.to.send(name, data);
      }
      else {
        this.sockets.forEach(socket => {
          if (socket.id === options.to) {
            socket.send(name, data);
          }
        })
      }
    }
    else if (options.exclude) {
      if (options.exclude instanceof Socket) {
        this.sockets.forEach(socket => {
          if (socket !== options.exclude) {
            socket.send(name, data);
          }
        })
      }
      else {
        this.sockets.forEach(socket => {
          if (socket.id !== options.to) {
            socket.send(name, data);
          }
        })
      }
    }
    else {
      this.sockets.forEach(socket => {
        socket.send(name, data);
      })
    }
  }

  close () {
    this.server.close();
  }

  //@parameters('object')
  closeSocket (socket) {
    this.sockets.splice(this.sockets.indexOf(socket), 1);
  }

}

class Socket extends Evs {
  constructor(ws, id, handler) {
    super();
    this.socket = ws;
    this.id = id;
    this.handler = handler;
    this.socket.on('message', data => {
      let payload = JSON.parse(data)
      let { name, message } = payload
      this.trigger(name, message);
    });
    this.socket.on('close', data => {
      this.trigger('close', data);
    })
    return this;
  }

  //@parameters('string', 'any')
  send (name, data) {
    let message = {
      name: name,
      message: data
    }
    this.socket.send(JSON.stringify(message));
    return this;
  }

  broadcast (name, data) {
    this.handler.send(name, data, {exclude: this.id});
    return this;
  }

  close () {
    this.handler.closeSocket(this);
  }


}
