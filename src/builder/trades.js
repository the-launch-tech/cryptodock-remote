import moment from 'moment'
import Trade from '../models/Trade'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'

const { log, error } = console

export default function(exchangeId, exchangeName, Client) {
  log('Trades Started', exchangeName)

  const map = exchangeMap[exchangeName]
  const tradeObject = map.getTradesObject
  const getTradesTimeFn = map.getTradesTimeFn

  function getTrades(pair) {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductTrades(pair)
          .then(resolve)
          .catch(error)
      } else if (exchangeName === 'kucoin') {
        Client.getTradeHistories({ symbol: pair })
          .then(res => resolve(res.data))
          .catch(error)
      }
    })
  }

  function getLastSequences(products) {
    return products.map(({ id, pair }) => {
      return Trade.getLastSequence(id, exchangeId).then(lastSequence => {
        return { id, pair, lastSequence }
      })
    })
  }

  function getProductTrades(products) {
    return products.map(product => {
      return global.RequestBalancer.request(
        retry => {
          return getTrades(product.pair)
            .then(trades => (exchangeName === 'coinbasepro' ? trades.reverse() : trades))
            .then(trades => {
              return { trades, id: product.id, lastSequence: product.lastSequence }
            })
        },
        exchangeName,
        exchangeName
      )
    })
  }

  function getSavedIds(products) {
    const loopProductTrades = product => {
      return product.trades
        .map(async trade => {
          if (trade[tradeObject['sequence']] > product.lastSequence) {
            return await Trade.save(trade, product.id, exchangeId, tradeObject, getTradesTimeFn)
          }
        })
        .filter(Boolean)
    }

    return products.map(async product => await Promise.all(loopProductTrades(product)))
  }

  Product.getExchangeProducts(exchangeId)
    .then(async products => await Promise.all(getLastSequences(products)))
    .then(async products => await Promise.all(getProductTrades(products)))
    .then(async products => await Promise.all(getSavedIds(products)))
    .then(() => log('Trades Complete', exchangeName))
    .catch(error)
}
