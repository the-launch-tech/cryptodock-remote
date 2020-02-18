import tableMap from './tableMap'
import query from './query'

const { log, error } = console

export default class BuilderQuery {
  constructor({
    table = null,
    type = 'all',
    constraints = [],
    meta = {},
    fields = [],
    joins = [],
  }) {
    this.table = table
    this.type = type
    this.constraints = constraints
    this.meta = meta
    this.fields = fields
    this.joins = joins

    this.hasJoins = this.hasJoins.bind(this)
    this.returnType = this.returnType.bind(this)
    this.buildFields = this.buildFields.bind(this)
    this.buildConstraints = this.buildConstraints.bind(this)
    this.buildOrderBy = this.buildOrderBy.bind(this)
    this.buildOrder = this.buildOrder.bind(this)
    this.buildPagination = this.buildPagination.bind(this)
    this.getString = this.getString.bind(this)
    this.getBinding = this.getBinding.bind(this)
    this.make = this.make.bind(this)

    this.returnType()
  }

  hasJoins() {
    return this.joins.length
  }

  returnType() {
    this.type = this.meta.pageSize === 1 ? 'single' : 'all'
  }

  buildFields() {
    const returnField = (table, field, as) => {
      return ` ${table}.${field} ${as ? 'AS ' + as : ''} `
    }

    const mapTableFields = (table, fields) => {
      return fields.length
        ? fields.map(field => returnField(table, field))
        : tableMap[table].fields.map(({ field, as }) => returnField(table, field, as))
    }

    const mainFields = mapTableFields(this.table, this.fields)

    const secondaryFields = this.hasJoins()
      ? this.joins.map(({ table, fields }) => mapTableFields(table, fields))
      : []

    return [...mainFields, ...secondaryFields].join(', ')
  }

  buildFrom() {
    const returnFrom = table => {
      return ` ${table} AS ${table} `
    }

    const returnJoinFrom = (joinType, joinTable, joinField, table) => {
      return ` ${joinType} JOIN ${joinTable} AS ${joinTable} ON ${table}.${joinField} = ${joinTable}.id `
    }

    const mainFrom = returnFrom(this.table)

    const secondaryFrom = this.hasJoins()
      ? this.joins.map(({ table }) => {
          const { type, field } = tableMap[this.table]['joins'][table]
          return returnJoinFrom(type, table, field, this.table)
        })
      : []

    return [mainFrom, ...secondaryFrom].join(', ')
  }

  buildConstraints() {
    let hasWhere = false

    const returnConstraint = (table, key, compare) => {
      const constraint = ` ${hasWhere ? 'AND' : 'WHERE'} ${table}.${key} ${compare} ? `
      hasWhere = true
      return constraint
    }

    const mapConstraints = (table, constraints) => {
      return constraints && constraints.length
        ? constraints.map(({ key, compare }) => returnConstraint(table, key, compare))
        : []
    }

    const mainConstraints = mapConstraints(this.table, this.constraints)

    const secondaryConstraints = this.hasJoins()
      ? this.joins.map(({ constraints, table }) => mapConstraints(table, constraints).join(' '))
      : []

    return [...mainConstraints, ...secondaryConstraints].join(' ')
  }

  buildOrderBy() {
    const returnOrderBy = (table, orderBy) => {
      return ` ORDER BY ${table}.${orderBy} `
    }

    const filterMatches = (table, orderBy) => {
      return tableMap[table].fields.filter(({ field }) => field === orderBy)
    }

    const findTable = (table, matches) => {
      return matches.length ? table : null
    }

    const orderBy = typeof this.meta.orderBy === 'string' ? this.meta.orderBy : 'created'

    if (
      !this.hasJoins() ||
      orderBy === 'id' ||
      orderBy === 'created' ||
      orderBy === 'updated' ||
      orderBy === 'product_id' ||
      orderBy === 'exchange_id'
    ) {
      return returnOrderBy(this.table, orderBy)
    }

    const mainOrderBy = findTable(this.table, filterMatches(this.table, orderBy))

    const joinOrderBy = this.joins
      .map(({ table }) => findTable(table, filterMatches(table, orderBy)))
      .filter(Boolean)

    return returnOrderBy([mainOrderBy, joinOrderBy].filter(Boolean), orderBy)
  }

  buildOrder() {
    const returnOrder = order => {
      return ` ${order.toUpperCase() === 'DESC' || order.toUpperCase() === 'ASC' ? order : 'DESC'} `
    }

    const order = this.meta.order ? this.meta.order : 'DESC'

    return returnOrder(order)
  }

  buildPagination({ page, pageSize }) {
    const returnPagination = (offset, count) => {
      return ` LIMIT ${parseInt(offset)}, ${parseInt(count)} `
    }

    if (this.meta.pageSize) {
      const currentPage = this.meta.page ? this.meta.page : 0
      const offset = this.meta.pageSize * currentPage
      return returnPagination(offset, this.meta.pageSize)
    } else {
      return ''
    }
  }

  getString() {
    return [
      'SELECT ',
      this.buildFields(),
      ` FROM `,
      this.buildFrom(),
      this.buildConstraints(),
      this.buildOrderBy(),
      this.buildOrder(),
      this.buildPagination(),
    ].join()
  }

  getBinding() {
    return this.constraints.map(constraint => constraint.key)
  }

  async make() {
    try {
      return await query(this.getString(), this.getBinding(), this.type)
    } catch (err) {
      throw err
    }
  }
}

// {
//   table: 'klines',
//   type: 'all',
//   constraints: [
//     { key: 'created', value: 'exampleCreation', compare: '>' },
//     { key: 'open', value: 'somName', compare: '>' },
//     { key: 'close', value: 'somName', compare: '<' },
//   ],
//   meta: {
//     order: 'DESC',
//     orderBy: 'name',
//     page: 1,
//     pageSize: 1,
//   },
//   fields: ['server_time', 'low', 'high', 'open', 'close'],
//   joins: [
//     {
//       table: 'products',
//       fields: ['pair'],
//       constraints: [{ key: 'pair', value: 'BTC-USD', compare: '=' }],
//     },
//     { table: 'exchanges', fields: ['name'] },
//   ],
// }
