const Binance = require('node-binance-us-api')

module.exports = {
  initialize: () => {
    const params = {
      APIKEY: process.env.BINANCE_API_KEY,
      APISECRET: process.env.BINANCE_API_SECRET,
      useServerTime: true,
    }

    new Binance().options(params)
  },
}
