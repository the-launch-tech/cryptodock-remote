import Kucoin from '../clients/Kucoin'

const { log, error } = console

export default class KucoinController {
  static async getCurrencies(req, res, next) {
    try {
      const { data } = await Kucoin.getCurrencies()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getSymbolsList(req, res, next) {
    const { Errors } = global.config
    const { market } = req.params

    if (!market) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getSymbolsList({ market })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getTicker(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getTicker({ symbol: pair })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAllTickers(req, res, next) {
    try {
      const { data } = await Kucoin.getAllTickers()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async get24HourStats(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.get24HourStats({ symbol: pair })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getMarketList(req, res, next) {
    try {
      const { data } = await Kucoin.getMarketList()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getPartOrderBook(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query
    const { depth } = req.params

    if (!pair || !depth) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getPartOrderBook({ symbol: pair, depth })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getFullOrderBookAggregated(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query
    const { depth } = req.params

    if (!pair || !depth) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getFullOrderBookAggregated({ symbol: pair, depth })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getFullOrderBookAtomic(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getFullOrderBookAtomic({ symbol: pair })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getTradeHistories(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getTradeHistories({ symbol: pair })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getKlines(req, res, next) {
    const { Errors } = global.config
    const { pair } = req.query
    const { start, end, granularity } = req.params

    if (!pair) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getKlines({
        symbol: pair,
        startAt: start,
        endAt: end,
        type: granularity,
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getCurrencyDetail(req, res, next) {
    const { Errors } = global.config
    const { currency } = req.query
    const { chain } = req.params

    if (!currency) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getCurrencyDetail({ currency, chain })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getFiatPrice(req, res, next) {
    const { Errors } = global.config
    const { base } = req.query
    const { currencies } = req.params

    if (!base || !currencies) {
      return next(Errors.InvalidParameters)
    }

    try {
      const { data } = await Kucoin.getFiatPrice({ base, currencies })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}
