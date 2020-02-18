import users from './local'
import exchanges from './kucoin'
import products from './coinbasepro'
import klines from './local'
import tickers from './kucoin'
import trades from './coinbasepro'
import coinbasepro from './kucoin'
import kucoin from './coinbasepro'

const { log, error } = console

export default CryptoDock => {
  log('routers')

  const { version } = global.config.srv

  CryptoDock.use(`/${version}/users`, users(CryptoDock))
  CryptoDock.use(`/${version}/exchanges`, exchanges(CryptoDock))
  CryptoDock.use(`/${version}/products`, products(CryptoDock))
  CryptoDock.use(`/${version}/klines`, klines(CryptoDock))
  CryptoDock.use(`/${version}/tickers`, tickers(CryptoDock))
  CryptoDock.use(`/${version}/trades`, trades(CryptoDock))
  CryptoDock.use(`/${version}/coinbasepro`, coinbasepro(CryptoDock))
  CryptoDock.use(`/${version}/kucoin`, kucoin(CryptoDock))
}
