const CoinbasePro = require('coinbase-pro')

module.exports = {
  initialize: () => {
    const key = process.env.COINBASEPRO_API_KEY
    const secret = process.env.COINBASEPRO_API_SECRET
    const password = process.env.COINBASEPRO_API_PASSWORD
    const base = 'https://api.pro.coinbase.com'

    return new CoinbasePro.AuthenticatedClient(key, secret, password, base)
  },
}
