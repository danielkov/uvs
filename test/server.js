const Uvs = require('../lib/server')
const http = require('http')
const fs = require('fs')

let html, js1, js2

fs.readFile('test/index.html', (err, file) => {
  if (!err) {
    html = file
  }
})

fs.readFile('test/client.js', (err, file) => {
  if (!err) {
    js1 = file
  }
})

fs.readFile('test/test.js', (err, file) => {
  if (!err) {
    js2 = file
  }
})

function sendHtml (res, file) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(file)
}

function sendJs (res, file) {
  res.writeHead(200, {'Content-Type': 'text/javascript'})
  res.end(file)
}

http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      sendHtml(res, html)
      break;
    case '/test.js':
      sendJs(res, js2)
      break;
    case '/client.js':
      sendJs(res, js1)
      break;
    default:

  }
}).listen(420)

let wss = new Uvs({port: 3000});

wss.on('connection', ws => {
  ws.send('id', ws.id)
  ws.on('message', data => {
    wss.send('message', data)
  })
})
