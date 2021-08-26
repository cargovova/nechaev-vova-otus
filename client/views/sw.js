const ws = new WebSocket('ws://localhost:9000')

const msg = {
  type: 'message',
  text: 'service worker registered'
}

ws.onopen = (event) => {
  ws.send(JSON.stringify(msg))
}

ws.onmessage = (fromServer) => {
  self.registration.showNotification(fromServer.data)
  if (fromServer.data === 'stop') {
    self.registration.unregister()
  }
}

ws.onerror = (error) => {
  console.error(error)
}
