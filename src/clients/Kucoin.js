import Kucoin from 'kucoin-sdk'

export default {
  initialize: () => {
    const { keys } = global.config

    const params = {
      SECRET: keys.kucoinSecret,
      KEY: keys.kucoinKey,
    }

    return new Kucoin(params)
  },
}
