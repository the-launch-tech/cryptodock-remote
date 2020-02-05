import Queue from 'smart-request-balancer'

export default new Queue({
  rules: {
    coinbasepro: {
      rate: 1,
      limit: 0.7,
      priority: 1,
    },
    kucoin: {
      rate: 1,
      limit: 0.15,
      priority: 1,
    },
    binance: {
      rate: 1,
      limit: 1,
      priority: 1,
    },
    kraken: {
      rate: 1,
      limit: 1,
      priority: 1,
    },
  },
})
