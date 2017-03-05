'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class, _dec3, _desc2, _value2, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var UWSS = require('uws').Server;
var Evs = require('evs');

var _require = require('./decorators'),
    parameters = _require.parameters;

module.exports = (_dec = parameters('string', 'any', 'optional'), _dec2 = parameters('object'), (_class = function (_Evs) {
  _inherits(Server, _Evs);

  function Server(opts) {
    _classCallCheck(this, Server);

    var _this = _possibleConstructorReturn(this, (Server.__proto__ || Object.getPrototypeOf(Server)).call(this));

    _this.server = new UWSS(opts);
    _this.sockets = [];
    _this.server.on('connection', function (ws) {
      var socket = new Socket(ws, _this.genId(), _this);
      _this.sockets.push(socket);
      _this.trigger('connection', socket);
    });
    return _this;
  }

  _createClass(Server, [{
    key: 'send',
    value: function send(name, data, opts) {
      var options = {
        to: opts.to || false,
        exclude: opts.exclude || false
      };
      if (options.to) {
        if (options.to instanceof Socket) {
          options.to.send(name, data);
        } else {
          this.sockets.forEach(function (socket) {
            if (socket.id === options.to) {
              socket.send(name, data);
            }
          });
        }
      } else if (options.exclude) {
        if (options.exclude instanceof Socket) {
          this.sockets.forEach(function (socket) {
            if (socket !== options.exclude) {
              socket.send(name, data);
            }
          });
        } else {
          this.sockets.forEach(function (socket) {
            if (socket.id !== options.to) {
              socket.send(name, data);
            }
          });
        }
      } else {
        this.sockets.forEach(function (socket) {
          socket.send(name, data);
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.server.close();
    }
  }, {
    key: 'closeSocket',
    value: function closeSocket(socket) {
      this.sockets.splice(this.sockets.indexOf(socket), 1);
    }
  }]);

  return Server;
}(Evs), (_applyDecoratedDescriptor(_class.prototype, 'send', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'send'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeSocket', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'closeSocket'), _class.prototype)), _class));

var Socket = (_dec3 = parameters('string', 'any'), (_class2 = function (_Evs2) {
  _inherits(Socket, _Evs2);

  function Socket(ws, id, handler) {
    var _ret;

    _classCallCheck(this, Socket);

    var _this2 = _possibleConstructorReturn(this, (Socket.__proto__ || Object.getPrototypeOf(Socket)).call(this));

    _this2.socket = ws;
    _this2.id = id;
    _this2.handler = handler;
    _this2.socket.on('message', function (data) {
      var name = data.name;
      _this2.trigger(name, data.message);
    });
    _this2.socket.on('close', function (data) {
      _this2.trigger('close', data);
    });
    return _ret = _this2, _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Socket, [{
    key: 'send',
    value: function send(name, data) {
      var message = {
        name: name,
        message: JSON.stringify(data)
      };
      this.socket.send('message', message);
      return this;
    }
  }, {
    key: 'broadcast',
    value: function broadcast(name, data) {
      this.handler.send(name, data, { exclude: this.id });
    }
  }, {
    key: 'close',
    value: function close() {
      this.handler.closeSocket(this);
    }
  }]);

  return Socket;
}(Evs), (_applyDecoratedDescriptor(_class2.prototype, 'send', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'send'), _class2.prototype)), _class2));