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

export default function(exchangeId, exchangeName, Client) {
  log(
    'Kline Builder for ' + exchangeName + ' | Started:',
    moment()
      .local()
      .format('YYYY-MM-DD HH:mm:ss.SSS')
  )

  const period = 60
  const map = exchangeMap[exchangeName]
  const klinePeriod = map.klinePeriod
  const granularity = klinePeriod[period.toString()]
  const maxCandles = map.maxCandles
  const currTime = moment().unix() * 1000

  function getKlines(pair, start, end, granularity) {
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

  function getLastTimestamps(products) {
    return products.map(({ id, pair }) => {
      return KLine.getLastTimestamp(id, exchangeId)
        .then(lastTimestamp => {
          const prevTime = moment(lastTimestamp).unix() * 1000
          const diffMs = currTime - prevTime
          const diffSec = Math.round(diffMs / 1000)
          const periodCount = Math.floor(diffSec / period)
          const periodArr = [
            ...Array(periodCount < maxCandles ? 1 : Math.floor(periodCount / maxCandles)).keys(),
          ]
          return { id, pair, lastTimestamp, prevTime, periodArr, maxCandles }
        })
        .catch(error)
    })
  }

  function buildPeriodList(products) {
    const loopPeriodsArray = ({ id, pair, lastTimestamp, prevTime, periodArr, maxCandles }) => {
      let start = prevTime

      return periodArr.map(n => {
        const periodObj = {
          id,
          pair,
          start: moment(start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(start)
            .add({ hours: maxCandles * (period / 60 / 60) })
            .format('YYYY-MM-DD HH:mm:ss'),
          granularity,
        }

        start =
          moment(start)
            .add({ hours: maxCandles * (period / 60 / 60) })
            .unix() * 1000

        return periodObj
      })
    }

    return products.map(async product => await Promise.all(loopPeriodsArray(product)))
  }

  function getProductKlines(products) {
    const loopPeriods = periods => {
      return periods.map(({ pair, start, end, granularity, id }) => {
        return RequestBalancer.request(
          retry => {
            return getKlines(pair, start, end, granularity)
              .then(klines => {
                return { id, klines }
              })
              .catch(error)
          },
          exchangeName,
          exchangeName
        )
      })
    }

    return products.map(async periods => await Promise.all(loopPeriods(periods)))
  }

  function saveProductKlines(products) {
    const handleKlineSave = group => {
      return group.klines.reverse().map(kline => {
        return KLine.save(kline, group.id, exchangeId, map, period)
          .then(data => data.insertId)
          .catch(error)
      })
    }

    const loopProductKlines = product => {
      return product.map(async group => await Promise.all(handleKlineSave(group)))
    }

    return products.map(async product => await Promise.all(loopProductKlines(product)))
  }

  Product.getExchangeProducts(exchangeId)
    .then(async products => await Promise.all(getLastTimestamps(products)))
    .then(async products => await Promise.all(buildPeriodList(products)))
    .then(async products => await Promise.all(getProductKlines(products)))
    .then(async products => await Promise.all(saveProductKlines(products)))
    .then(dataIds => {
      const ids = dataIds.flat(Infinity)
      log(
        'Kline Builder for ' + exchangeName + ' | Ended:',
        moment()
          .local()
          .format('YYYY-MM-DD HH:mm:ss.SSS'),
        ' Start ID: ' + ids[0] + ' - End ID: ' + ids[ids.length - 1]
      )
    })
    .catch(error)
}
