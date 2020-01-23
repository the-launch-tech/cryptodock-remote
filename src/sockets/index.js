import url from 'url'

const { log, error } = console

export default function(Wss) {
  function noop() {}

  function heartbeat() {
    this.isAlive = true
  }

  Wss.on('connection', (Ws, req) => {
    const ip = req.connection.remoteAddress
    const pathname = url.parse(req.url).pathname

    if (pathname === '/orderbook') {
      Ws.send(JSON.toString({ connection: 'orderbook' }))

      // Incoming message data, send something back based on arguments
      Ws.on('message', data => {
        // Example: send message to all clients
        Wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data)
          }
        })
      })
    }
  })

  setInterval(() => {
    Wss.clients.forEach(Ws => {
      if (Ws.isAlive === false) {
        return Ws.terminate()
      }
      Ws.isAlive = false
      Ws.ping(noop)
    })
    log('\n Set Interval Ping Test \n')
  }, 30000)
}
