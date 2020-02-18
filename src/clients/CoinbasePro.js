import CoinbasePro from 'coinbase-pro'

export default {
  initialize: () => {
    const { keys } = global.config

    const key = keys.coinbaseproKey
    const secret = keys.coinbaseproSecret
    const password = keys.coinbaseproPw
    const base = keys.coinbaseproBaseUrl

    return new CoinbasePro.AuthenticatedClient(key, secret, password, base)
  },
}
