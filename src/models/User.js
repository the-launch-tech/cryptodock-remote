import query from '../utils/query'

const { log, error } = console

export default class User {
  static async single({ key, value }) {
    try {
      return await query(
        'SELECT id, first_name, last_name, email, access_key, password, created FROM users WHERE ' +
          key +
          '=? LIMIT 1',
        [value],
        'single'
      )
    } catch (err) {
      throw err
    }
  }

  static async save({ first_name, last_name, email }, pw) {
    try {
      return await query(
        'INSERT INTO users (first_name, last_name, email, password) values (?,?,?,?)',
        [first_name, last_name, email, pw],
        'save'
      )
    } catch (err) {
      throw err
    }
  }

  static async update({ id, fields }) {
    try {
      return await query(
        [
          'UPDATE users SET ',
          ...Object.keys(fields).map((key, i) => {
            let s = ' ' + key + '=? '
            if (i >= Object.keys(fields).length - 1) {
              s += ', '
            }
            return s
          }),
          ' WHERE id=?',
        ].join(),
        [...Object.keys(fields).map((key, i) => fields[key]), id]
      )
    } catch (err) {
      throw err
    }
  }

  static async delete({ id }) {
    try {
      return await query('DELETE FROM users WHERE id=?', [id])
    } catch (err) {
      throw err
    }
  }
}
