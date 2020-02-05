import Kraken from 'kraken-sdk'

export default {
  initialize: () => {
    const params = {
      SECRET: process.env.KRAKEN_API_SECRET,
      KEY: process.env.KRAKEN_API_KEY,
    }

    return new Kraken(params)
  },
}
