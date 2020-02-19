import Product from '../models/Product'

const { log, error } = console

export default class ProductsController {
  static async getProducts(req, res, next) {
    try {
      const data = await Product.get(req.query)
      return data
    } catch (err) {
      next(err)
    }
  }

  static async saveProducts(req, res, next) {
    const { Errors } = global.config
    const { products, exchangeId, map } = req.body

    if (!products || !exchangeId || !map) {
      return next(Errors.InvalidParameters)
    }

    try {
      const loopItems = ps => {
        return ps.map(async p => await Product.save({ product: p, exchangeId, map }))
      }

      const ids = Promise.all(loopItems(products))
      res.json(ids)
    } catch (err) {
      next(err)
    }
  }
}
