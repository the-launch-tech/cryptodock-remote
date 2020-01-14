const moment = require('moment')

module.exports = {
  coinbasepro: {
    getProducts: 'getProducts',
    getKLinePeriod: 'getProductHistoricRates',
    product: 'id',
    object: {
      pair: 'id',
      base: 'base_currency',
      quote: 'quote_currency',
      base_min: 'base_min_size',
      base_max: 'base_max_size',
      quote_min: 'quote_increment',
      margin: 'margin_enabled',
    },
    klineArr: [0, 1, 2, 3, 4, 6, 5],
    klinePeriod: {
      60: 60,
      300: 300,
      900: 900,
      3600: 3600,
    },
    getTradesObject: {
      sequence: 'trade_id',
      server_time: 'time',
      price: 'price',
      size: 'size',
      quote_size: 'quote_size',
      side: 'side',
      best_match: 'best_match',
    },
    getTradesTimeFn: server_time =>
      moment(server_time)
        .local()
        .format('YYYY-MM-DD HH:mm:ss.SSS'),
    tickerObject: {
      sequence: 'trade_id',
      server_time: 'time',
      price: 'price',
      size: 'size',
      bid: 'bid',
      ask: 'ask',
      volume: 'volume',
      best_bid_size: 'bestBidSize',
      best_ask_size: 'bestAskSize',
    },
    tickersTimeFn: server_time =>
      moment(server_time)
        .local()
        .format('YYYY-MM-DD HH:mm:ss.SSS'),
    maxCandles: 300,
  },
  kucoin: {
    getProducts: 'getSymbolsList',
    getKLinePeriod: 'getKlines',
    product: 'symbol',
    object: {
      pair: 'symbol',
      base: 'baseCurrency',
      quote: 'quoteCurrency',
      base_min: 'baseMinSize',
      base_max: 'baseMaxSize',
      quote_min: 'quoteMinSize',
      quote_max: 'quoteMaxSize',
      margin: 'isMarginEnabled',
      trading: 'enableTrading',
    },
    klineArr: [0, 4, 3, 1, 2, 5, 6],
    klinePeriod: {
      60: '1min',
      300: '5min',
      900: '15min',
      3600: '1hour',
    },
    getTradesObject: {
      sequence: 'sequence',
      server_time: 'time',
      price: 'price',
      size: 'size',
      quote_size: 'quote_size',
      side: 'side',
      best_match: 'best_match',
    },
    getTradesTimeFn: server_time =>
      moment(parseInt(server_time.toString().substr(0, 13), 10))
        .local()
        .format('YYYY-MM-DD HH:mm:ss.SSS'),
    tickerObject: {
      sequence: 'sequence',
      server_time: 'time',
      price: 'price',
      size: 'size',
      bid: 'bestBid',
      ask: 'bestAsk',
      volume: 'volume',
      best_bid_size: 'bestBidSize',
      best_ask_size: 'bestAskSize',
    },
    tickersTimeFn: server_time =>
      moment(parseInt(server_time.toString().substr(0, 13), 10))
        .local()
        .format('YYYY-MM-DD HH:mm:ss.SSS'),
    maxCandles: 1500,
  },
}
