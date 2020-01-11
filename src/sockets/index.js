export default function(Wss) {
  Wss.on('connection', Ws => {
    Ws.send(JSON.toString({ connection: 'ok' }))

    Ws.on('message', message => {
      Wss.clients.forEach(client => {
        client.send(JSON.toString({ message }))
      })
    })
  })
}
