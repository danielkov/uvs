(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Evs = require('evs');

var Uvs = function (_With) {
  _inherits(Uvs, _With);

  function Uvs() {
    var _ref;

    _classCallCheck(this, Uvs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Uvs.__proto__ || Object.getPrototypeOf(Uvs)).call.apply(_ref, [this].concat(args)));

    if (!args[0].startsWith('ws://')) {
      args[0] = 'ws://' + args[0];
    }
    _this.onmessage = function (e) {
      var data = JSON.parse(e.data);
      _this.trigger(data.name, data.data);
    };
    _this.onopen = function (e) {
      _this.trigger('open', e);
    };
    _this.onerror = function (e) {
      _this.trigger('error', e);
    };
    _this.onclose = function (e) {
      _this.trigger('close', e);
    };
    return _this;
  }

  _createClass(Uvs, [{
    key: 'send',
    value: function send(name, data) {
      _get(Uvs.prototype.__proto__ || Object.getPrototypeOf(Uvs.prototype), 'send', this).call(this, JSON.stringify({ name: name, data: data }));
    }
  }]);

  return Uvs;
}(With(WebSocket, Evs));

exports.default = Uvs;


function With() {
  var Mix = function Mix() {
    _classCallCheck(this, Mix);
  };

  for (var _len2 = arguments.length, mixins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    mixins[_key2] = arguments[_key2];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var mixin = _step.value;

      copyProperties(Mix, mixin);
      copyProperties(Mix.prototype, mixin.prototype);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Mix;
}

function copyProperties(target, source) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Reflect.ownKeys(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (key !== "constructor" && key !== "prototype" && key !== "name") {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

},{"evs":2}],2:[function(require,module,exports){
module.exports = require('./lib/evs');
},{"./lib/evs":3}],3:[function(require,module,exports){
module.exports = class Evs {
	/**
 	 * Represents the event system class.
   * @constructor
   */
	constructor () {
		this._handlers = new Map();
		this._allHandlers = new Array();
	}
	/**
 	 * Subscribe to an event.
   * @param {string} name - the string containing space separated names of events to subscribe to.
	 * @param {array} fn - functions to pass to the handler.
	 * @return {class} this
   */
	on (name, ...fn) {
		if (name) {
			let _fn = this._deepArrayMerge(fn);
			this._subscribe(name, _fn);
		}
		return this;
	}
	/**
 	 * Subscribe to an event that will be removed on first trigger.
   * @param {string} name - the string containing space separated names of events to subscribe to.
	 * @param {array} fn - functions to pass to the handler.
	 * @return {class} this
   */
	once (name, ...fn) {
		let _fn = this._deepArrayMerge(fn);
		for (let i = _fn.length - 1; i >= 0; i--) {
			let __fn = _fn[i];
			_fn[i] = (data, name, i) => {
				__fn.apply(this, arguments);
				this.off(name, i);
			}
		}
		this.on(name, _fn);
		return this;
	}
	/**
 	 * Subscribe to all events.
	 * @param {array} fn - functions to pass to the handler.
	 * @return {class} this
   */
	all (...fn) {
		let _fn = this._deepArrayMerge(fn);
		this._allHandlers = this._allHandlers.concat(_fn);
		return this;
	}
	/**
 	 * Unsubscribe from event.
   * @param {string} name - the string containing the space separated names to unsubscribe from.
	 * @param {number} i - optional parameter to use if only want to remove a specific handler function.
	 * @return {class} this
   */
	off (name, i) {
		let _names = name.split(' ');
		for (let n = _names.length - 1; n >= 0; n--) {
			if (typeof i === 'number' && this._handlers.get(_names[n])) {
				this._handlers.get(_names[n]).splice(i, 1);
			}
			else if (this._handlers.get(_names[n])) {
				this._handlers.delete(_names[n]);
			}
		}
		return this;
	}
	/**
 	 * Trigger an event.
   * @param {string} name - the string containing space separated names of events trigger.
	 * @param {any} data - any data to pass into the handler function.
	 * @return {class} this
   */
	trigger (name, data) {
		for (let i = 0; i < this._allHandlers.length; i++) {
			this._allHandlers[i]((data) ? data : {});
		}
		if (name) {
			let _names = name.split(' ');
			for (let i = _names.length - 1; i >= 0; i--) {
				if (Array.isArray(this._handlers.get(_names[i]))) {
					this._handlers.get(_names[i]).forEach((fn, n) => {
						fn((data) ? data : {}, _names[i], n);
					})
				}
			}
		}
		return this;
	}
	/**
 	 * Remove all handlers.
	 * @return {class} this
   */
	offAll () {
    this._handlers = new Map();
		this._allHandlers = new Array();
		return this;
	}
	/**
 	 * Private function to handle subscriptions.
	 * @private
   * @param {string} name - the string containing space separated names of events to subscribe to.
	 * @param {array} fn - functions to pass to the handler.
	 * @return {undefined} undefined
   */
	_subscribe(name, fn) {
		let _names = name.split(' ');
		for (let i = _names.length - 1; i >= 0; i--) {
			if (Array.isArray(this._handlers.get(_names[i]))) {
				this._handlers.set(_names[i], this._handlers.get(_names[i]).concat(fn));
			}
			else {
				this._handlers.set(_names[i], fn);
			}
		}
	}
	/**
	 * Private function to deep merge arrays.
	 * @private
	 * @param {array} arr - array to deep merge.
	 * @return {array} _arr
	 */
	_deepArrayMerge (arr) {
		let _arr = [];
		_loop(arr);
		function _loop (a) {
			for (let i = a.length - 1; i >= 0; i--) {
				if (Array.isArray(a[i])) {
					_loop(a[i]);
				}
				else {
					_arr.push(a[i]);
				}
			}
		}
		return _arr.reverse();
	}
}

},{}],4:[function(require,module,exports){
'use strict';

var _client = require('../lib/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = document.querySelector('#result');

var uvs = new _client2.default('localhost:3000');

uvs.on('open', function () {
  log('Connection opened.');
  ws.on('heartbeat', function (data) {
    log(data);
  });
});

function log(data) {
  result.innerHTML += data + '\n';
}

},{"../lib/client":1}]},{},[4]);
