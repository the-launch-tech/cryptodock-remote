import BuilderQuery from '../utils/BuilderQuery'
import query from '../utils/query'

const { log, error } = console

export default class Exchange {
  static async get({ constraints = [], meta = {}, fields = [], joins = [] }) {
    try {
      const Query = new BuilderQuery({
        table: 'exchanges',
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

  static async save({ name, label }) {
    log({ name, label })
    try {
      return await query('INSERT INTO exchanges (name, label) values (?, ?)', [name, label], 'save')
    } catch (err) {
      throw err
    }
  }
}
