import Controller from './Controller'
import Kucoin from '../clients/Kucoin'
import exchangeMap from '../utils/exchangeMap'

class KucoinController extends Controller {
  constructor() {
    super()
  }

  getCurrencies(req, res, next) {
    Kucoin.getCurrencies(({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getSymbolsList(req, res, next) {
    const { market } = req.params
    if (!market) {
      return super.err(res, 500)
    }
    Kucoin.getSymbolsList({ market }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getTicker(req, res, next) {
    const { pair } = req.query
    if (!pair) {
      return super.err(res, 500)
    }
    Kucoin.getTicker({ symbol: pair }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getAllTickers(req, res, next) {
    Kucoin.getAllTickers(({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  get24HourStats(req, res, next) {
    const { pair } = req.query
    if (!pair) {
      return super.err(res, 500)
    }
    Kucoin.get24HourStats({ symbol: pair }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getMarketList(req, res, next) {
    Kucoin.getMarketList(({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getPartOrderBook(req, res, next) {
    const { pair } = req.query
    const { depth } = req.params
    if (!pair || !depth) {
      return super.err(res, 500)
    }
    Kucoin.getPartOrderBook({ pair, depth }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getFullOrderBookAggregated(req, res, next) {
    const { pair } = req.query
    const { depth } = req.params
    if (!pair || !depth) {
      return super.err(res, 500)
    }
    Kucoin.getFullOrderBookAggregated({ pair, depth }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getFullOrderBookAtomic(req, res, next) {
    const { pair } = req.query
    if (!pair) {
      return super.err(res, 500)
    }
    Kucoin.getFullOrderBookAtomic({ symbol: pair }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getTradeHistories(req, res, next) {
    const { pair } = req.query
    if (!pair) {
      return super.err(res, 500)
    }
    Kucoin.getTradeHistories({ symbol: pair }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getKlines(req, res, next) {
    const { pair } = req.query
    const { start, end, granularity } = req.params
    if (!pair) {
      return super.err(res, 500)
    }
    Kucoin.getKlines(
      { symbol: pair, startAt: start, endAt: end, type: granularity },
      ({ error, data }) => {
        if (error) return super.err(res, 500, error)
        res.json(data)
      }
    )
  }

  getCurrencyDetail(req, res, next) {
    const { currency } = req.query
    const { chain } = req.params
    if (!currency) {
      return super.err(res, 500)
    }
    Kucoin.getCurrencyDetail({ currency, chain }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }

  getFiatPrice(req, res, next) {
    const { base } = req.query
    const { currencies } = req.params
    if (!base || !currencies) {
      return super.err(res, 500)
    }
    Kucoin.getFiatPrice({ base, currencies }, ({ error, data }) => {
      if (error) return super.err(res, 500, error)
      res.json(data)
    })
  }
}

export default KucoinController
