import Binance from 'node-binance-us-api'

export default {
  initialize: () => {
    const params = {
      APIKEY: process.env.BINANCE_API_KEY,
      APISECRET: process.env.BINANCE_API_SECRET,
      useServerTime: true,
    }

    return new Binance().options(params)
  },
}
