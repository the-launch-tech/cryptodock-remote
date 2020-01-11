import Controller from './Controller'
import CoinbasePro from '../clients/CoinbasePro'
import exchangeMap from '../utils/exchangeMap'

class CoinbaseProController extends Controller {
  constructor() {
    super()
  }

  getProducts(req, res, next) {
    CoinbasePro.getProducts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getProductOrderBook(req, res, next) {
    const { level } = req.params
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getProductOrderBook(
      req.query.pair,
      { level: level ? level : 3 },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  getProductTicker(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getProductTicker(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getProductTrades(req, res, next) {
    const { after } = req.params
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getProductTrades(
      req.query.pair,
      { after: after ? after : 0 },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  getProductHistoricRates(req, res, next) {
    const { granularity, start, end } = req.params
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getProductHistoricRates(
      req.query.pair,
      { granularity, start, end },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  getProduct24HrStats(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getProduct24HrStats(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getCurrencies(req, res, next) {
    CoinbasePro.getCurrencies((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getTime(req, res, next) {
    CoinbasePro.getTime((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getCoinbaseAccounts(req, res, next) {
    CoinbasePro.getCoinbaseAccounts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getPaymentMethods(req, res, next) {
    CoinbasePro.getPaymentMethods((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getAccounts(req, res, next) {
    CoinbasePro.getAccounts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getAccount(req, res, next) {
    CoinbasePro.getAccount(req.query.accountID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getAccountHistory(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountHistory(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getAccountTransfers(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountTransfers(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getAccountHolds(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountHolds(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  buy(req, res, next) {
    const { price, size, product_id } = req.params
    if (!price || !size || !product_id) {
      return super.err(res, 500)
    }
    CoinbasePro.buy(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  sell(req, res, next) {
    const { price, size, product_id } = req.params
    if (!price || !size || !product_id) {
      return super.err(res, 500)
    }
    CoinbasePro.sell(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  placeOrder(req, res, next) {
    const { price, size, product_id, side } = req.params
    if (!price || !size || !product_id || !side) {
      return super.err(res, 500)
    }
    CoinbasePro.placeOrder(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  cancelOrder(req, res, next) {
    if (!req.query.orderID) {
      return super.err(res, 500)
    }
    CoinbasePro.cancelOrder(req.query.orderID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  cancelOrders(req, res, next) {
    CoinbasePro.cancelOrders((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  cancelAllOrders(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.cancelAllOrders(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getOrders(req, res, next) {
    CoinbasePro.getOrders(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getOrder(req, res, next) {
    if (!req.query.orderID) {
      return super.err(res, 500)
    }
    CoinbasePro.getOrder(req.query.orderID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getFills(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500)
    }
    CoinbasePro.getFills(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getFundings(req, res, next) {
    CoinbasePro.getFundings((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  repay(req, res, next) {
    const { amount, currency } = req.params
    if (!amount || !currency) {
      return super.err(res, 500)
    }
    CoinbasePro.repay(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  marginTransfer(req, res, next) {
    const { margin_profile_id, type, amount, currency } = req.params
    if (!margin_profile_id || !type || !amount || !currency) {
      return super.err(res, 500)
    }
    CoinbasePro.marginTransfer(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  closePosition(req, res, next) {
    CoinbasePro.closePosition(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  convert(req, res, next) {
    const { from, to, amount } = req.params
    if (!from || !to || !amount) {
      return super.err(res, 500)
    }
    CoinbasePro.convert(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  deposit(req, res, next) {
    const { amount, currency, coinbase_account_id } = req.params
    if (!amount || !currency || !coinbase_account_id) {
      return super.err(res, 500)
    }
    CoinbasePro.deposit(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  withdraw(req, res, next) {
    const { amount, currency, coinbase_account_id } = req.params
    if (!amount || !currency || !coinbase_account_id) {
      return super.err(res, 500)
    }
    CoinbasePro.withdraw(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  depositCrypto(req, res, next) {
    const { currency } = req.params
    if (!currency) {
      return super.err(res, 500)
    }
    CoinbasePro.depositCrypto(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  withdrawCrypto(req, res, next) {
    const { amount, currency, crypto_address } = req.params
    if (!amount || !currency || !crypto_address) {
      return super.err(res, 500)
    }
    CoinbasePro.withdrawCrypto(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  depositPayment(req, res, next) {
    const { amount, currency, payment_method_id } = req.params
    if (!amount || !currency || !payment_method_id) {
      return super.err(res, 500)
    }
    CoinbasePro.depositPayment(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  withdrawPayment(req, res, next) {
    const { amount, currency, payment_method_id } = req.params
    if (!amount || !currency || !payment_method_id) {
      return super.err(res, 500)
    }
    CoinbasePro.withdrawPayment(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  getTrailingVolume(req, res, next) {
    CoinbasePro.getTrailingVolume((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }
}

export default CoinbaseProController
