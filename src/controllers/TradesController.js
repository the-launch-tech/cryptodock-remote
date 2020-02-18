import Trade from '../models/Trade'

const { log, error } = console
const { Errors } = global.config

export default class TradesController {
  static async getTrades(req, res, next) {
    try {
      const data = await Trade.get(req.query)
      return data
    } catch (err) {
      next(err)
    }
  }

  static async saveTrades(req, res, next) {
    const { trades, exchangeId, productId, map } = req.body

    if (!trades || !exchangeId || !productId || !map) {
      return next(Errors.InvalidParameters)
    }

    try {
      const loopItems = ts => {
        return ts.map(async t => await Trade.save({ trade: t, exchangeId, productId, map }))
      }

      const ids = Promise.all(loopItems(trades))
      res.json(ids)
    } catch (err) {
      next(err)
    }
  }
}
