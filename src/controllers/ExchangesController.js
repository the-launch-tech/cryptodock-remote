import Exchange from '../models/Exchange'

const { log, error } = console

export default class KlinesController {
  static async getExchanges(req, res, next) {
    try {
      const exchanges = await Exchange.get(req.query)
      res.json(data)
    } catch (err) {
      next(err)
    }
  }

  static async saveExchange(req, res, next) {
    const { Errors } = global.config
    const { name, label } = req.body

    if (!name || !label) {
      return next(Errors.InvalidParameters)
    }

    try {
      const id = await Exchange.save({ name, label })
      res.json(id)
    } catch (err) {
      next(err)
    }
  }
}
