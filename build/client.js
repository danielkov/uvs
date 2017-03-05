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

    if (!args[0].startsWith('ws://')) {
      args[0] = 'ws://' + args[0];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Uvs.__proto__ || Object.getPrototypeOf(Uvs)).call.apply(_ref, [this].concat(args)));

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