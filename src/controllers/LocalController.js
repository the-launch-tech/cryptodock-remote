import Controller from './Controller'
import Exchange from '../models/Exchange'
import Product from '../models/Product'
import Trade from '../models/Trade'
import Ticker from '../models/Ticker'
import KLine from '../models/KLine'

class LocalController extends Controller {
  constructor() {
    super()
  }

  /*
   * Get Exchanges
   * @query names <arr > [optional]
   * @query fields <arr name, label, etc...> [optional]
   */
  getExchanges(req, res, next) {
    const { name, fields } = req.query
    Exchange.get(req.query)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }

  /*
   * Get Products
   * @query pairs <arr > [optional]
   * @query exchanges <arr > [optional]
   * @query fields <arr pair, base, quote, etc...> [optional]
   */
  getProducts(req, res, next) {
    const { pairs, exchanges, fields } = req.query
    Product.get(req.query)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }

  /*
   * Get Klines
   * @query pairs <arr > [optional]
   * @query exchanges <arr > [optional]
   * @query fields <obj name, label, etc...> [optional]
   * @query start <datetime> [optional]
   * @query end <datetime> [optional]
   * @query period <int> [optional]
   * @query limit <int> [optional]
   * @query order <string> [default='DESC']
   */
  getKlines(req, res, next) {
    const { pairs, exchanges, fields, start, end, period, limit, order } = req.query
    KLine.get(req.query)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }

  /*
   * Get Tickers
   * @query pairs <arr > [optional]
   * @query exchanges <arr > [optional]
   * @query fields <obj name, label, etc...> [optional]
   * @query start <datetime> [optional]
   * @query end <datetime> [optional]
   * @query limit <int> [optional]
   * @query order <string> [default='DESC']
   */
  getTickers(req, res, next) {
    const { pairs, exchanges, fields, start, end, limit, order } = req.query
    Ticker.get(req.query)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }

  /*
   * Get Trades
   * @query pairs <arr > [optional]
   * @query exchanges <arr > [optional]
   * @query fields <obj name, label, etc...> [optional]
   * @query start <datetime> [optional]
   * @query end <datetime> [optional]
   * @query limit <int> [optional]
   * @query order <string> [default='DESC']
   */
  getTrades(req, res, next) {
    const { pairs, exchanges, fields, start, end, limit, order } = req.query
    Trade.get(req.query)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }
}

export default LocalController
