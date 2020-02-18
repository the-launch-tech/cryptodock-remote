import query from '../utils/query'

const { log, error } = console

export default class Product {
  static async get({ constraints = [], meta = {}, fields = [], joins = [] }) {
    try {
      const Query = new BuilderQuery({
        table: 'products',
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

  static async save({ product, exchangeId, map }) {
    try {
      return await query(
        'INSERT INTO products (pair, base, quote, trading, margin, iceberg, oco, spot_trading, base_min, base_max, quote_min, quote_max, exchange_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product[map['pair']],
          product[map['base']],
          product[map['quote']],
          product[map['trading']],
          product[map['margin']],
          product[map['iceberg']],
          product[map['oco']],
          product[map['spot_trading']],
          product[map['base_min']],
          product[map['base_max']],
          product[map['quote_min']],
          product[map['quote_max']],
          exchangeId,
        ],
        'save'
      )
    } catch (err) {
      throw err
    }
  }
}
