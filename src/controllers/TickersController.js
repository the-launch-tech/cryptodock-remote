import Ticker from '../models/Ticker'

const { log, error } = console
const { Errors } = global.config

export default class TickersController {
  static async getTickers(req, res, next) {
    try {
      const data = await Ticker.get(req.query)
      return data
    } catch (err) {
      next(err)
    }
  }

  static async saveTickers(req, res, next) {
    const { tickers, exchangeId, productId, map } = req.body

    if (!tickers || !exchangeId || !productId || !map) {
      return next(Errors.InvalidParameters)
    }

    try {
      const loopItems = ts => {
        return ts.map(async t => await Ticker.save({ ticker: t, exchangeId, productId, map }))
      }

      const ids = Promise.all(loopItems(tickers))
      res.json(ids)
    } catch (err) {
      next(err)
    }
  }
}
