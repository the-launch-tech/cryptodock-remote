import Kucoin from 'kucoin-sdk'

export default {
  initialize: () => {
    const params = {
      SECRET: process.env.KUCOIN_API_SECRET,
      KEY: process.env.KUCOIN_API_KEY,
    }

    return new Kucoin(params)
  },
}
