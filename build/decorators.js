'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports.parameters = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (target, key, descriptor) {
    var oldFunc = descriptor;
    descriptor = function descriptor() {
      for (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        a[_key2] = arguments[_key2];
      }

      a.forEach(function (arg, i) {
        if (args[i] !== 'any' && args[i] !== 'optional' && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) !== args[i] && args[i !== 'array'] || args[i] === 'array' && Array.isArray(arg) === false) throw new TypeError('Argument ' + i + ' should be of type ' + args[i] + '.');
      });
      oldFunc.call.apply(oldFunc, [undefined].concat(a));
    };
  };
};