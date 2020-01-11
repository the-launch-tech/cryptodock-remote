require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import ws from 'ws'
import { Conn } from 'mysql-layer'
import RestBuilder from './builder/index'
import routes from './routes/index'
import sockets from './sockets/index'

const { log, error } = console

global.Conn = new Conn({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

global.Conn.connection.connect()

const ApiApp = express()
const Router = express.Router()

ApiApp.use(bodyParser.urlencoded({ extended: true }))

ApiApp.use(bodyParser.json())

ApiApp.use((req, res, next) => {
  log('%s %s %s %s', req.method, req.url, req.path, process.env.DB_API)
  next()
})

routes(ApiApp)

ApiApp.listen(process.env.PORT, () => {
  log('App Booted At: ' + process.env.PORT + '. Version: ' + process.env.VERSION)
})

const WebsocketApp = express()
const Wss = new ws.Server({ server: WebsocketApp })
sockets(Wss)
WebsocketApp.listen(process.env.WS_PORT, () => {
  log('Websocket Booted At: ' + process.env.WS_PORT + '. Version: ' + process.env.WS_VERSION)
})

RestBuilder()
