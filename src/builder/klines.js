import KLine from '../models/KLine'
import RequestBalancer from '../utils/RequestBalancer'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'
import moment from 'moment'

const { log, error } = console

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h)
  return this
}

module.exports = function(exchangeId, exchangeName, Client, { period }) {
  log('In Kline Builder')
  const map = exchangeMap[exchangeName]
  const klinePeriod = map.klinePeriod
  const granularity = klinePeriod[period.toString()]
  const maxCandlesInGroup = map.maxCandles
  const currentTimestamp = moment().unix() * 1000

  const getKLinePeriod = (pair, start, end, granularity) => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductHistoricRates(pair, {
          granularity,
          start,
          end,
        })
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getKlines({
          symbol: pair,
          startAt: moment(start).unix(),
          endAt: moment(end).unix(),
          type: granularity,
        })
          .then(data => resolve(data.data))
          .catch(reject)
      }
    })
  }

  Product.getExchangeProducts(exchangeId)
    .then(products => {
      products.map(({ id, pair }) => {
        KLine.getLastTimestamp(id, exchangeId)
          .then(lastTimestamp => {
            const prevTimeFormatted = moment(lastTimestamp).unix() * 1000
            const diffMs = currentTimestamp - prevTimeFormatted
            const diffSec = Math.round(diffMs / 1000)
            const periodCount = Math.floor(diffSec / period)
            const candleGroupCount =
              periodCount < maxCandlesInGroup ? 1 : Math.floor(periodCount / maxCandlesInGroup)
            let start = prevTimeFormatted
            for (let i = 0; i < candleGroupCount; i++) {
              RequestBalancer.request(
                retry => {
                  getKLinePeriod(
                    pair,
                    moment(start).format('YYYY-MM-DD HH:mm:ss'),
                    moment(start)
                      .add({ hours: maxCandlesInGroup * (period / 60 / 60) })
                      .format('YYYY-MM-DD HH:mm:ss'),
                    granularity
                  )
                    .then(history => {
                      history.reverse().map(kline => KLine.save(kline, id, exchangeId, map, period))
                    })
                    .catch(error)
                  start =
                    moment(start)
                      .add({ hours: maxCandlesInGroup * (period / 60 / 60) })
                      .unix() * 1000
                },
                exchangeName,
                exchangeName
              ).catch(error)
            }
          })
          .catch(error)
      })
    })
    .catch(error)
}
