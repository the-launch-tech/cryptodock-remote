import moment from 'moment'
import query from '../utils/query'

const { log, error } = console

export default class Kline {
  static async get({ constraints = [], meta = {}, fields = [], joins = [] }) {
    try {
      const Query = new BuilderQuery({
        table: 'klines',
        type: 'all',
        constraints,
        meta,
        fields,
        joins,
      })

      return await Query.make()
    } catch (err) {
      throw err
    }
  }

  static async save({ kline, exchangeId, productId, map: { klineArr } }) {
    try {
      return await query(
        'INSERT INTO klines (server_time, low, high, open, close, amount, volume, period, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          moment(kline[klineArr[0]] * 1000)
            .local()
            .format('YYYY-MM-DD HH:mm:ss.SSS'),
          kline[klineArr[1]],
          kline[klineArr[2]],
          kline[klineArr[3]],
          kline[klineArr[4]],
          kline[klineArr[5]],
          kline[klineArr[6]],
          periodInSeconds,
          exchangeId,
          productId,
        ],
        'save'
      )
    } catch (err) {
      throw err
    }
  }
}
