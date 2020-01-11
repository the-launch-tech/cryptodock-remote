import Trade from '../models/Trade'
import RequestBalancer from '../utils/RequestBalancer'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'

const { log, error } = console

module.exports = function(exchangeId, exchangeName, Client) {
  log('In Trade Builder')
  const map = exchangeMap[exchangeName]
  const tradeObject = map.getTradesObject
  const getTradesTimeFn = map.getTradesTimeFn

  const getTrades = (pair, start, end, granularity) => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductTrades(pair)
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getTradeHistories({ symbol: pair })
          .then(res => resolve(res.data))
          .catch(reject)
      }
    })
  }

  Product.getExchangeProducts(exchangeId)
    .then(products => {
      products.map(({ id, pair }) => {
        Trade.getLastSequence(id, exchangeId)
          .then(lastSequence => {
            RequestBalancer.request(
              retry =>
                getTrades(pair)
                  .then(trades => {
                    trades = exchangeName === 'coinbasepro' ? trades.reverse() : trades
                    trades.map(trade => {
                      if (trade[tradeObject['sequence']] > lastSequence) {
                        Trade.save(trade, id, exchangeId, tradeObject, getTradesTimeFn)
                      }
                    })
                  })
                  .catch(error),
              exchangeName,
              exchangeName
            ).catch(error)
          })
          .catch(error)
      })
    })
    .catch(error)
}
