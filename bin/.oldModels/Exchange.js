function getAll() {
  return new Promise((resolve, reject) => {
    global.Conn.asyncQuery('SELECT * FROM exchanges', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function getExchanges({ names, fields }) {
  let query = 'SELECT '
  let args = []

  if (fields) {
    if (Array.isArray(fields)) {
      query += fields.join(',')
    } else {
      query += fields.replace(/[^0-9a-z]/gi, '')
    }
  } else {
    query += '*'
  }

  query += ' FROM exchanges '

  if (names) {
    if (Array.isArray(names)) {
      let nameArr = []
      names.forEach(n => nameArr.push('name=? '))
      query += 'WHERE (' + nameArr.join('OR ') + ')'
      args = names
    } else {
      query += 'WHERE name=?'
      args.push(names)
    }
  }

  return new Promise((resolve, reject) => {
    global.Conn.asyncQuery(query, args, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
