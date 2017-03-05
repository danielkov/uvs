//import Uvs from '../lib/client'

const result = document.querySelector('#result')
const form = document.querySelector('#form')
const text = document.querySelector('#text')

const uvs = new Uvs('192.168.0.16:3000')

uvs.on('open', (ws) => {
  log('Connection opened.')
  ws.all((data) => {
    console.log(data);
    log(data)
  })
})

form.onsubmit = function (e) {
  e.preventDefault()
  uvs.send('message', text.value)
  text.value = ''
}

function log (data) {
  result.innerHTML += data + '<br>'
}
