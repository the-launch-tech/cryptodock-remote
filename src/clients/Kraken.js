import Kraken from 'kraken-sdk'

export default {
  initialize: () => {
    const { keys } = global.config

    const params = {
      SECRET: keys.krakenSecret,
      KEY: keys.krakenKey,
    }

    return new Kraken(params)
  },
}
