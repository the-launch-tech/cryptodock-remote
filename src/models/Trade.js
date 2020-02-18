import moment from 'moment'
import query from '../utils/query'

const { log, error } = console

export default class Trade {
  static async get({ constraints = [], meta = {}, fields = [], joins = [] }) {
    try {
      const Query = new BuilderQuery({
        table: 'trades',
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

  static async save({ trade, exchangeId, productId, map: { getTradesObject, tradeTimeFn } }) {
    try {
      return await query(
        'INSERT INTO trades (sequence, server_time, price, size, quote_size, side, best_match, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          trade[getTradesObject['sequence']],
          tradeTimeFn(trade[getTradesObject['server_time']]),
          trade[getTradesObject['price']],
          trade[getTradesObject['size']],
          trade[getTradesObject['quote_size']],
          trade[getTradesObject['side']],
          trade[getTradesObject['best_match']],
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
