import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 9000 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  let i = 0
  let timerId = setInterval(() => ws.send(++i + ' ' + 'something'), 3000)
  setTimeout(() => {
    clearInterval(timerId)
    ws.send('stop')
  }, 30000)
})