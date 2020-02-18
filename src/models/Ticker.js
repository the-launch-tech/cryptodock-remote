import moment from 'moment'
import query from '../utils/query'

const { log, error } = console

export default class Ticker {
  static async get({ constraints = [], meta = {}, fields = [], joins = [] }) {
    try {
      const Query = new BuilderQuery({
        table: 'tickers',
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

  static async save({ ticker, exchangeId, productId, map: { tickerObject, tickersTimeFn } }) {
    try {
      return await query(
        'INSERT INTO tickers (sequence, server_time, price, size, bid, ask, volume, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ticker[tickerObject['sequence']],
          tickersTimeFn(ticker[tickerObject['server_time']]),
          ticker[tickerObject['price']],
          ticker[tickerObject['size']],
          ticker[tickerObject['bid']],
          ticker[tickerObject['ask']],
          ticker[tickerObject['volume']],
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
