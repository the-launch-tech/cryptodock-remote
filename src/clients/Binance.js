import Binance from 'node-binance-us-api'

export default {
  initialize: () => {
    const { keys } = global.config

    const params = {
      APIKEY: keys.binanceKey,
      APISECRET: keys.binanceSecret,
      useServerTime: true,
    }

    return new Binance().options(params)
  },
}
