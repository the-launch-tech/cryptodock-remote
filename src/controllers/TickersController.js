import Ticker from '../models/Ticker'

const { log, error } = console

export default class TickersController {
  static async getTickers(req, res, next) {
    try {
      const data = await Ticker.get(req.query)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async saveTickers(req, res, next) {
    const { Errors } = global.config
    const { tickers, exchangeId, productId, map } = req.body.tickers

    if (!tickers || !exchangeId || !productId || !map) {
      return next(Errors.InvalidParameters)
    }

    try {
      const loopItems = ts => {
        return ts.map(async t => await Ticker.save({ ticker: t, exchangeId, productId, map }))
      }

      const ids = Promise.all(loopItems(tickers))
      res.status(200).json(ids)
    } catch (err) {
      next(err)
    }
  }
}
