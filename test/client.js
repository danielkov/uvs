class Evs {
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


class Uvs extends Evs {
  constructor (...args) {
    super(...args);
		let url
    if (!args[0].startsWith('ws://')) {
      url = `ws://${args[0]}`;
    }
		if (args[0] === undefined || typeof args[0] !== 'string') {
			url = document.location.origin.replace(/^(http)|(https)+/, 'ws')
		}
    this.socket = new WebSocket(url)
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
    this.socket.send(JSON.stringify({name: name, message: data}));
		return this;
  }
}
