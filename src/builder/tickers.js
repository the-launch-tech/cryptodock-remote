import moment from 'moment'
import Ticker from '../models/Ticker'
import RequestBalancer from '../utils/RequestBalancer'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'

const { log, error } = console

export default function(exchangeId, exchangeName, Client) {
  log('Tickers Started', exchangeName)

  const map = exchangeMap[exchangeName]
  const tickerObject = map.tickerObject
  const tickersTimeFn = map.tickersTimeFn

  function getTicker(pair) {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductTicker(pair)
          .then(resolve)
          .catch(error)
      } else if (exchangeName === 'kucoin') {
        Client.getTicker({ symbol: pair })
          .then(res => resolve(res.data))
          .catch(error)
      }
    })
  }

  function getLastSequences(products) {
    return products.map(({ id, pair }) => {
      return Ticker.getLastSequence(id, exchangeId).then(lastSequence => {
        return { id, pair, lastSequence }
      })
    })
  }

  function getProductTickers(products) {
    return products.map(product => {
      return global.RequestBalancer.request(
        retry => {
          return getTicker(product.pair).then(ticker => {
            return { ticker, id: product.id, lastSequence: product.lastSequence }
          })
        },
        exchangeName,
        exchangeName
      )
    })
  }

  function getSavedIds(products) {
    return products
      .map(async product => {
        if (product.ticker[tickerObject['sequence']] > product.lastSequence) {
          return await Ticker.save(
            product.ticker,
            product.id,
            exchangeId,
            tickerObject,
            tickersTimeFn
          )
        }
      })
      .filter(Boolean)
  }

  Product.getExchangeProducts(exchangeId)
    .then(async products => await Promise.all(getLastSequences(products)))
    .then(async products => await Promise.all(getProductTickers(products)))
    .then(async products => await Promise.all(getSavedIds(products)))
    .then(() => log('Tickers Complete', exchangeName))
    .catch(error)
}
