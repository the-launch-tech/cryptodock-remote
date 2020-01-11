const Kraken = require('kraken-sdk')

module.exports = {
  initialize: () => {
    const params = {
      SECRET: process.env.KRAKEN_API_SECRET,
      KEY: process.env.KRAKEN_API_KEY,
    }

    return new Kraken(params)
  },
}
