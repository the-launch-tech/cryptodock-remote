import Model from './Model'
import moment from 'moment'

const { log, error } = console

class Trade extends Model {
  constructor() {
    super()
  }

  static get({ pairs, exchanges, fields, start, end, limit, order = 'ASC' }) {
    let query = 'SELECT '
    let args = []

    const andOrWhere = str => {
      return str.includes('WHERE') ? 'AND' : 'WHERE'
    }

    const cols = {
      exchanges: ['name', 'label'],
      products: ['pair', 'base', 'quote'],
      trades: [
        'id',
        'server_time',
        'sequence',
        'price',
        'size',
        'quote_size',
        'side',
        'best_match',
        'created',
        'exchange_id',
        'product_id',
      ],
    }

    if (fields) {
      if (Array.isArray(fields)) {
        let updatedFields = []
        fields.forEach(f => {
          if (cols.exchanges.includes(f)) {
            f = 'exchanges.' + f.replace(/[^0-9a-z_]/gi, '')
          } else if (cols.products.includes(f)) {
            f = 'products.' + f.replace(/[^0-9a-z_]/gi, '')
          } else if (cols.trades.includes(f)) {
            f = 'trades.' + f.replace(/[^0-9a-z_]/gi, '')
          }
          updatedFields.push(f)
        })
        if (!updatedFields.includes('trades.server_time')) {
          updatedFields.push('trades.server_time')
        }
        query += updatedFields.join(',')
      } else {
        if (cols.exchanges.includes(fields)) {
          query += ' exchanges.' + fields.replace(/[^0-9a-z_]/gi, '') + ', trades.server_time '
        } else if (cols.products.includes(fields)) {
          query += ' products.' + fields.replace(/[^0-9a-z_]/gi, '') + ', trades.server_time '
        } else if (cols.trades.includes(fields)) {
          query += ' trades.' + fields.replace(/[^0-9a-z_]/gi, '') + ', trades.server_time '
        } else {
          query += ''
        }
      }
    } else {
      query += ' trades.*'
    }

    query += ' FROM trades '

    if (pairs) {
      query += ' RIGHT JOIN products ON products.id = trades.product_id '
    }

    if (exchanges) {
      query += ' RIGHT JOIN exchanges ON exchanges.id = trades.exchange_id '
    }

    if (pairs) {
      if (Array.isArray(pairs)) {
        let pairArr = []
        pairs.forEach(n => pairArr.push('products.pair=? '))
        query += ' ' + andOrWhere(query) + ' (' + pairArr.join('OR ') + ')'
        args = [...args, ...pairs]
      } else {
        query += ' ' + andOrWhere(query) + ' products.pair=?'
        args.push(pairs)
      }
    }

    if (exchanges) {
      if (Array.isArray(exchanges)) {
        let exchangeArr = []
        exchanges.forEach(n => exchangeArr.push('exchanges.name=? '))
        query += ' ' + andOrWhere(query) + ' (' + exchangeArr.join('OR ') + ') '
        args = [...args, ...exchanges]
      } else {
        query += ' ' + andOrWhere(query) + ' exchanges.name=? '
        args.push(exchanges)
      }
    }

    if (start || end) {
      if (start) {
        query += ' ' + andOrWhere(query) + ' trades.server_time > ? '
        args.push(moment(start).format('YYYY-MM-DD HH:mm:ss.SSS'))
      }
      if (end) {
        query += ' ' + andOrWhere(query) + ' trades.server_time < ? '
        args.push(moment(end).format('YYYY-MM-DD HH:mm:ss.SSS'))
      }
    } else {
      query +=
        ' ' +
        andOrWhere(query) +
        ' trades.server_time > "' +
        moment(end ? end : Date.now())
          .subtract({ hours: 48 })
          .format('YYYY-MM-DD HH:mm:ss.SSS') +
        '" '
    }

    query += ' ORDER BY trades.server_time ' + (order === 'ASC' ? 'ASC' : 'DESC') + ' '

    if (limit > 0 && parseInt(limit)) {
      query += ' LIMIT ' + parseInt(limit) + ' '
    }

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(query, args, (err, data) => {
        log(err)
        if (err) reject(err)
        log('ARGS: ', args)
        log('COUNT: ', data ? data.length : 0)
        log('QUERY: ', query)
        resolve(data)
      })
    })
  }

  static getLastSequence(productId, exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT sequence FROM trades WHERE product_id=? AND exchange_id=? ORDER BY sequence DESC LIMIT 1',
        [productId, exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['sequence'] : 0)
        }
      )
    })
  }

  static save(trade, productId, exchangeId, getTradesObject, tradeTimeFn) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
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
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default Trade
