import Exchange from '../models/Exchange'

const { log, error } = console

export default class KlinesController {
  static async getExchanges(req, res, next) {
    try {
      const data = await Exchange.get(req.query)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async saveExchange(req, res, next) {
    const { Errors } = global.config
    log('req.body', req.body)
    const { name, label } = req.body.exchange
    log('name', name)
    log('label', label)

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
