import users from './users'
import exchanges from './exchanges'
import products from './products'
import klines from './klines'
import tickers from './tickers'
import trades from './trades'
import coinbasepro from './coinbasepro'
import kucoin from './kucoin'

const { log, error } = console

export default [
  { path: 'users', routes: users },
  { path: 'exchanges', routes: exchanges },
  { path: 'products', routes: products },
  { path: 'klines', routes: klines },
  { path: 'tickers', routes: tickers },
  { path: 'trades', routes: trades },
  { path: 'coinbasepro', routes: coinbasepro },
  { path: 'kucoin', routes: kucoin },
]
