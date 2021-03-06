import Kline from '../models/Kline'

const { log, error } = console

export default class KlinesController {
  static async getKlines(req, res, next) {
    try {
      const klines = await Kline.get(req.query)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async saveKlines(req, res, next) {
    const { Errors } = global.config
    const { klines, exchangeId, productId, map } = req.body.klines

    if (!klines || !exchangeId || !productId || !map) {
      return next(Errors.InvalidParameters)
    }

    try {
      const loopItems = ks => {
        return ks.map(async k => await Kline.save({ kline: k, exchangeId, productId, map }))
      }

      const ids = Promise.all(loopItems(klines))
      res.status(200).json(ids)
    } catch (err) {
      next(err)
    }
  }
}
