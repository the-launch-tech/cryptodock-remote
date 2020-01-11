const Kucoin = require('kucoin-sdk')

module.exports = {
  initialize: () => {
    const params = {
      SECRET: process.env.KUCOIN_API_SECRET,
      KEY: process.env.KUCOIN_API_KEY,
    }

    return new Kucoin(params)
  },
}
