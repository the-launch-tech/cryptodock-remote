import KLine from '../models/KLine'
import RequestBalancer from '../utils/RequestBalancer'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'
import moment from 'moment'

const { log, error } = console

export default function(exchangeId, exchangeName, Client) {
  log('Klines Started', exchangeName)

  const period = 60
  const map = exchangeMap[exchangeName]
  const klinePeriod = map.klinePeriod
  const granularity = klinePeriod[period.toString()]
  const maxCandles = 300
  const hours = maxCandles * (period / period / period)

  function getKlines(pair, start, granularity) {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductHistoricRates(pair, {
          granularity,
          start: start.coinbasepro,
        })
          .then(resolve)
          .catch(error)
      } else if (exchangeName === 'kucoin') {
        Client.getKlines({
          symbol: pair,
          startAt: start.kucoin,
          endAt: moment().unix(),
          type: granularity,
        })
          .then(data => resolve(data.data))
          .catch(error)
      }
    })
  }

  function getLastTimestamps(products) {
    return products.map(({ id, pair }) => {
      return KLine.getLastTimestamp(id, exchangeId)
        .then(lastTimestamp => {
          const start = moment(lastTimestamp)
          return {
            id,
            pair,
            start: {
              coinbasepro: start.format('YYYY-MM-DD HH:mm:ss'),
              kucoin: start.unix(),
            },
          }
        })
        .catch(error)
    })
  }

  function getProductKlines(products) {
    return products.map(({ id, pair, start }) => {
      return RequestBalancer.request(
        retry => {
          return getKlines(pair, start, granularity)
            .then(klines => {
              const isDuplicate = (a, b) =>
                a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5]
              let i = 1
              if (klines.length) {
                while (i < klines.length) {
                  if (isDuplicate(klines[i], klines[i - 1])) {
                    klines.splice(i, 1)
                  } else {
                    i++
                  }
                }
              }
              return { id, klines }
            })
            .catch(error)
        },
        exchangeName,
        exchangeName
      )
    })
  }

  function saveProductKlines(products) {
    const handleKlineSave = product => {
      return product.klines
        .reverse()
        .map(kline => KLine.save(kline, product.id, exchangeId, map, period).catch(error))
    }

    return products.map(async product => await Promise.all(handleKlineSave(product)))
  }

  Product.getExchangeProducts(exchangeId)
    .then(async products => await Promise.all(getLastTimestamps(products)))
    .then(async products => await Promise.all(getProductKlines(products)))
    .then(async products => await Promise.all(saveProductKlines(products)))
    .then(() => log('Klines Complete', exchangeName))
    .catch(error)
}
