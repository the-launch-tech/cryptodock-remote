import Model from './Model'
import moment from 'moment'

const { log, error } = console

class KLine extends Model {
  constructor() {
    super()
  }

  static get({ pairs, exchanges, fields, start, end, period = 3600, limit, order = 'ASC' }) {
    let query = 'SELECT '
    let args = []

    const andOrWhere = str => {
      return str.includes('WHERE') ? 'AND' : 'WHERE'
    }

    const cols = {
      exchanges: ['name', 'label'],
      products: ['pair', 'base', 'quote'],
      klines: [
        'id',
        'server_time',
        'low',
        'high',
        'open',
        'close',
        'amount',
        'volume',
        'period',
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
          } else if (cols.klines.includes(f)) {
            f = 'klines.' + f.replace(/[^0-9a-z_]/gi, '')
          }
          updatedFields.push(f)
        })
        if (!updatedFields.includes('klines.server_time')) {
          updatedFields.push('klines.server_time')
        }
        query += updatedFields.join(',')
      } else {
        if (cols.exchanges.includes(fields)) {
          query += 'exchanges.' + fields.replace(/[^0-9a-z_]/gi, '') + ', klines.server_time '
        } else if (cols.products.includes(fields)) {
          query += 'products.' + fields.replace(/[^0-9a-z_]/gi, '') + ', klines.server_time '
        } else if (cols.klines.includes(fields)) {
          query += 'klines.' + fields.replace(/[^0-9a-z_]/gi, '') + ', klines.server_time '
        } else {
          query += ''
        }
      }
    } else {
      query += 'klines.*'
    }

    query += ' FROM klines '

    if (pairs) {
      query += ' RIGHT JOIN products ON products.id = klines.product_id '
    }

    if (exchanges) {
      query += ' RIGHT JOIN exchanges ON exchanges.id = klines.exchange_id '
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
        query += ' ' + andOrWhere(query) + ' klines.server_time > ? '
        args.push(moment(start).format('YYYY-MM-DD HH:mm:ss.SSS'))
      }
      if (end) {
        query += ' ' + andOrWhere(query) + ' klines.server_time < ? '
        args.push(moment(end).format('YYYY-MM-DD HH:mm:ss.SSS'))
      }
    } else {
      query +=
        ' ' +
        andOrWhere(query) +
        ' klines.server_time > "' +
        moment(end ? end : Date.now())
          .subtract({ hours: 48 })
          .format('YYYY-MM-DD HH:mm:ss.SSS') +
        '" '
    }

    if (parseInt(period)) {
      query += ' ' + andOrWhere(query) + ' period=?'
    } else {
      query += ' ' + andOrWhere(query) + ' period=3600'
    }
    args.push(parseInt(period))

    query += ' ORDER BY klines.server_time ' + (order === 'ASC' ? 'ASC' : 'DESC') + ' '

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

  static getLastTimestamp(productId, exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT server_time FROM klines WHERE product_id=? AND exchange_id=? ORDER BY server_time DESC LIMIT 1',
        [productId, exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['server_time'] : moment().subtract({ hours: 24 }))
        }
      )
    })
  }

  static save(kline, productId, exchangeId, map, periodInSeconds) {
    const klineArr = map.klineArr
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO klines (server_time, low, high, open, close, amount, volume, period, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          moment(kline[klineArr[0]] * 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
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
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default KLine
