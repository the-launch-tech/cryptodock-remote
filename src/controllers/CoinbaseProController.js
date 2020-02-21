import CoinbasePro from '../clients/CoinbasePro'

const { log, error } = console

export default class CoinbaseProController {
  static async getProducts(req, res, next) {
    try {
      const data = await CoinbasePro.getProducts()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getProductOrderBook(req, res, next) {
    const { Errors } = global.config
    const { level } = req.params
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getProductOrderBook(pair, { level: level ? level : 3 })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getProductTicker(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getProductTicker(pair)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getProductTrades(req, res, next) {
    const { Errors } = global.config
    const { after } = req.params
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getProductTrades(pair, { after: after ? after : 0 })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getProductHistoricRates(req, res, next) {
    const { Errors } = global.config
    const { granularity, start, end } = req.params
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getProductHistoricRates(pair, { granularity, start, end })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getProduct24HrStats(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getProduct24HrStats(pair)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getCurrencies(req, res, next) {
    try {
      const data = await CoinbasePro.getCurrencies()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getTime(req, res, next) {
    try {
      const data = await CoinbasePro.getTime()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getCoinbaseAccounts(req, res, next) {
    try {
      const data = await CoinbasePro.getCoinbaseAccounts()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getPaymentMethods(req, res, next) {
    try {
      const data = await CoinbasePro.getPaymentMethods()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAccounts(req, res, next) {
    try {
      const data = await CoinbasePro.getAccounts()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAccount(req, res, next) {
    const { Errors } = global.config
    const { accountID } = req.query

    if (!accountID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getAccount(accountID)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAccountHistory(req, res, next) {
    const { Errors } = global.config
    const args = req.params
    const { accountID } = req.query

    if (!accountID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getAccountHistory(accountID, args)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAccountTransfers(req, res, next) {
    const { Errors } = global.config
    const args = req.params
    const { accountID } = req.query

    if (!accountID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getAccountTransfers(accountID, args)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAccountHolds(req, res, next) {
    const { Errors } = global.config
    const args = req.params
    const { accountID } = req.query

    if (!accountID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getAccountHolds(accountID, args)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async buy(req, res, next) {
    const { Errors } = global.config
    const { price, size, product_id } = req.params

    if (!price || !size || !product_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.buy({ price, size, product_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async sell(req, res, next) {
    const { Errors } = global.config
    const { price, size, product_id } = req.params

    if (!price || !size || !product_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.sell({ price, size, product_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async placeOrder(req, res, next) {
    const { Errors } = global.config
    const { price, size, product_id, side } = req.params

    if (!price || !size || !product_id || !side) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.placeOrder({ price, size, product_id, side })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async cancelOrder(req, res, next) {
    const { Errors } = global.config
    const { orderID } = req.query

    if (!orderID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.cancelOrder(orderID)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async cancelOrders(req, res, next) {
    try {
      const data = await CoinbasePro.cancelOrders()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async cancelAllOrders(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.cancelAllOrders(pair)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getOrders(req, res, next) {
    try {
      const data = await CoinbasePro.getOrders(req.params)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getOrder(req, res, next) {
    const { Errors } = global.config
    const { orderID } = req.query

    if (!orderID) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getOrder(orderID)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getFills(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.getFills(pair)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getFundings(req, res, next) {
    try {
      const data = await CoinbasePro.getFundings(pair)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async repay(req, res, next) {
    const { Errors } = global.config
    const { amount, currency } = req.params

    if (!amount || !currency) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.repay({ amount, currency })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async marginTransfer(req, res, next) {
    const { Errors } = global.config
    const { margin_profile_id, type, amount, currency } = req.params

    if (!margin_profile_id || !type || !amount || !currency) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.marginTransfer({ margin_profile_id, type, amount, currency })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async closePosition(req, res, next) {
    try {
      const data = await CoinbasePro.closePosition(req.params)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async convert(req, res, next) {
    const { Errors } = global.config
    const { from, to, amount } = req.params

    if (!from || !to || !amount) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.convert({ from, to, amount })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async deposit(req, res, next) {
    const { Errors } = global.config
    const { amount, currency, coinbase_account_id } = req.params

    if (!amount || !currency || !coinbase_account_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.deposit({ amount, currency, coinbase_account_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async withdraw(req, res, next) {
    const { Errors } = global.config
    const { amount, currency, coinbase_account_id } = req.params

    if (!amount || !currency || !coinbase_account_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.withdraw({ amount, currency, coinbase_account_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async depositCrypto(req, res, next) {
    const { Errors } = global.config
    const { currency } = req.params

    if (!currency) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.depositCrypto(req.params)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async withdrawCrypto(req, res, next) {
    const { Errors } = global.config
    const { amount, currency, crypto_address } = req.params

    if (!amount || !currency || !crypto_address) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.withdrawCrypto({ amount, currency, crypto_address })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async depositPayment(req, res, next) {
    const { Errors } = global.config
    const { amount, currency, payment_method_id } = req.params

    if (!amount || !currency || !payment_method_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.depositPayment({ amount, currency, payment_method_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async withdrawPayment(req, res, next) {
    const { Errors } = global.config
    const { amount, currency, payment_method_id } = req.params

    if (!amount || !currency || !payment_method_id) {
      return next(Errors.InvalidParameters)
    }

    try {
      const data = await CoinbasePro.withdrawPayment({ amount, currency, payment_method_id })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getTrailingVolume(req, res, next) {
    try {
      const data = await CoinbasePro.getTrailingVolume()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}
