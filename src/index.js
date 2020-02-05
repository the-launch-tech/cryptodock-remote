require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import { Conn } from 'the_launch-mysql-layer'
import RestBuilder from './builder/index'
import RequestBalancer from './utils/RequestBalancer'
import routes from './routes/index'

const { log, error } = console

global.Conn = new Conn({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})
global.Conn.connection.connect()
global.RequestBalancer = RequestBalancer

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

RestBuilder()
