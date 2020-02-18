function getAll() {
  return new Promise((resolve, reject) => {
    global.Conn.asyncQuery('SELECT * FROM products', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function getExchangeProducts(exchangeId) {
  return new Promise((resolve, reject) => {
    global.Conn.asyncQuery(
      'SELECT * FROM product_exchange AS pe INNER JOIN products p ON pe.product_id = p.id WHERE pe.exchange_id=?',
      [exchangeId],
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      }
    )
  })
}

function get({ pairs, exchanges, fields }) {
  let query = 'SELECT '
  let args = []

  const cols = {
    e: ['name', 'label'],
    p: ['pair', 'base', 'quote'],
    pe: [
      'id',
      'base_min',
      'base_max',
      'quote_min',
      'quote_max',
      'product_id',
      'exchange_id',
      'created_at',
      'updated_at',
    ],
  }

  if (fields) {
    if (Array.isArray(fields)) {
      let updatedFields = []
      fields.forEach(f => {
        if (cols.e.includes(f)) {
          f = 'e.' + f.replace(/[^0-9a-z_]/gi, '')
        } else if (cols.p.includes(f)) {
          f = 'p.' + f.replace(/[^0-9a-z_]/gi, '')
        } else if (cols.pe.includes(f)) {
          f = 'pe.' + f.replace(/[^0-9a-z_]/gi, '')
        }
        updatedFields.push(f)
      })
      query += updatedFields.join(',')
    } else {
      if (cols.e.includes(fields)) {
        query += 'e.' + fields.replace(/[^0-9a-z_]/gi, '')
      } else if (cols.p.includes(fields)) {
        query += 'p.' + fields.replace(/[^0-9a-z_]/gi, '')
      } else if (cols.pe.includes(fields)) {
        query += 'pe.' + fields.replace(/[^0-9a-z_]/gi, '')
      } else {
        query += ''
      }
    }
  } else {
    query += '*'
  }

  query +=
    ' FROM product_exchange AS pe INNER JOIN products p ON pe.product_id = p.id INNER JOIN exchanges e ON pe.exchange_id = e.id '

  if (pairs) {
    if (Array.isArray(pairs)) {
      let pairArr = []
      pairs.forEach(n => pairArr.push('p.pair=? '))
      query += 'WHERE (' + pairArr.join('OR ') + ')'
      args = pairs
    } else {
      query += 'WHERE p.pair=?'
      args.push(pairs)
    }
  }

  if (exchanges) {
    if (Array.isArray(exchanges)) {
      let exchangeArr = []
      exchanges.forEach(n => exchangeArr.push('e.name=? '))
      query += 'WHERE (' + exchangeArr.join('OR ') + ')'
      args = exchanges
    } else {
      query += 'WHERE e.name=?'
      args.push(exchanges)
    }
  }

  return new Promise((resolve, reject) => {
    global.Conn.asyncQuery(query, args, (err, data) => {
      if (err) reject(err)
      log('DATA: ', data)
      log('LENGTH: ', data ? data.length : 0)
      log('QUERY: ', query)
      log('ARGS: ', args)
      resolve(data)
    })
  })
}
