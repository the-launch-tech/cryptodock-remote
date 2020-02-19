require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import moment from 'moment'
import { Conn } from 'the_launch-mysql-layer'
import setHeaders from './middleware/setHeaders'
import errorHandler from './middleware/errorHandler'
import config from './config'
import RateLimiter from './utils/RateLimiter'
import RequestBalancer from './utils/RequestBalancer'
import routes from './routes/index'

global.config = config()

const { log, error } = console
const { db, srv } = global.config

global.Conn = new Conn({
  hostname: db.host,
  user: db.user,
  password: db.pw,
  database: db.name,
  multipleStatements: true,
})
global.Conn.connection.connect()
global.RequestBalancer = RequestBalancer
global.RateLimiter = new RateLimiter()

const CryptoDock = express()

CryptoDock.use(bodyParser.json({ limit: '500mb' }))
CryptoDock.use(bodyParser.urlencoded({ limit: '500mb', extended: false }))
CryptoDock.use(bodyParser.raw({ limit: '500mb', inflate: true, parameterLimit: 100000 }))
CryptoDock.use(cookieParser())
CryptoDock.use(setHeaders)
CryptoDock.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [srv.secret] }))

routes.map(route => {
  const SubApp = express()
  route.routes(SubApp)
  CryptoDock.use(`/${srv.version}/${route.path}`, SubApp)
})

CryptoDock.use(errorHandler)

CryptoDock.listen(srv.port, () => {
  log(
    'App Booted At: ' +
      srv.port +
      '. Version: ' +
      srv.version +
      '. Time: ' +
      moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  )
})
