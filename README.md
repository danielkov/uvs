# Uvs

Faster WebSocket Client and Server implementation.
___

UVS aims to be very lightweight, yet brings some very straight-forward messaging functionality to websockets. It uses `UWS` as its WebSocket engine, which means it's very fast, even compared to some of the non-wrapper implemenations. The whole idea is to wrap the regular WebSocket implementation in an (also very fast) Event Emitter instance, called `Evs`.

### Usage

Using Uvs is simple. On the server, all it takes is:

```js
const Server = require('uvs').Server

const wss = new Server({port: 3000})

wss.on('connection', ws => {
  ws.send('id', ws.id)
  ws.on('message', data => {
    wss.send('message', data)
  })
})
```

The options to the `Server` match exactly those of [UWS](https://www.npmjs.com/package/uws).

The `ws` is an instance of `Socket`, which has a unique id property. This allows you to easily differentiate between WebSocket connections and therefore handle authentication and 1 to 1 messaging very easily.

You can provide any `String` as the first parameter of `on()` and `send()` methods, which will identify the type of message the client will listen to. For example:

```js
ws.send('something', {
  message: 'Hello, World!'
})
```

... would yield to the following message on the client:

```js
import Client from 'uvs'

Client.on('open', ws => {
  ws.on('something', data => {
    console.log(data) // this will log a JS Object with { message: 'Hello, World!' }
  })
})
```

`Socket` instances emit the usual WebSocket events, normally, like `'error'`, `'close'` and `'open'`. These are native.

All in all, it's just a convenience wrapper for regular WebSockets, like `Socket.io`, but without fallbacks and of course much smaller and faster.

Some cooler methods are also added, like multiple listeners and special types of 'listener middleware'. This is because `Uvs` wraps WebSocket in `Evs`. Anything `Evs` can do, `Uvs` can also. I suggest reading up on the docs for `Evs`, [here](https://www.npmjs.com/package/evs).

### Contributing

Contributions are always welcome. You can send PR's any time, but make sure you submit an issue first.
