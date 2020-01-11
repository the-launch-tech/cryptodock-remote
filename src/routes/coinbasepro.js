export default (Api, CoinbaseProController, basePath) => {
  const base = `${process.env.DB_API}/${basePath}`

  Api.get(`${base}/public/products`, CoinbaseProController.getProducts)

  Api.get(`${base}/public/products/:pair/orderbook`, CoinbaseProController.getProductOrderBook)

  Api.get(`${base}/public/products/:pair/ticker`, CoinbaseProController.getProductTicker)

  Api.get(`${base}/public/products/:pair/trades`, CoinbaseProController.getProductTrades)

  Api.get(`${base}/public/products/:pair/historic`, CoinbaseProController.getProductHistoricRates)

  Api.get(`${base}/public/products/:pair/24_hours`, CoinbaseProController.getProduct24HrStats)

  Api.get(`${base}/public/public/currencies`, CoinbaseProController.getCurrencies)

  Api.get(`${base}/public/time`, CoinbaseProController.getTime)

  Api.get(`${base}/auth/accounts/coinbase`, CoinbaseProController.getCoinbaseAccounts)

  Api.get(`${base}/auth/accounts/payment_methods`, CoinbaseProController.getPaymentMethods)

  Api.get(`${base}/auth/accounts`, CoinbaseProController.getAccounts)

  Api.get(`${base}/auth/accounts/:accountID`, CoinbaseProController.getAccount)

  Api.get(`${base}/auth/accounts/:accountID/history`, CoinbaseProController.getAccountHistory)

  Api.get(`${base}/auth/accounts/:accountID/transfers`, CoinbaseProController.getAccountTransfers)

  Api.get(`${base}/auth/accounts/:accountID/holds`, CoinbaseProController.getAccountHolds)

  Api.get(`${base}/auth/buy/:pair`, CoinbaseProController.buy)

  Api.get(`${base}/auth/sell/:pair`, CoinbaseProController.sell)

  Api.get(`${base}/auth/orders/place/:pair`, CoinbaseProController.placeOrder)

  Api.get(`${base}/auth/orders/cancel/:orderID`, CoinbaseProController.cancelOrder)

  Api.get(`${base}/auth/orders/cancel/open`, CoinbaseProController.cancelOrders)

  Api.get(`${base}/auth/orders/cancel/:pair`, CoinbaseProController.cancelAllOrders)

  Api.get(`${base}/auth/orders`, CoinbaseProController.getOrders)

  Api.get(`${base}/auth/orders/:orderID`, CoinbaseProController.getOrder)

  Api.get(`${base}/auth/fills/:pair`, CoinbaseProController.getFills)

  Api.get(`${base}/auth/fundings`, CoinbaseProController.getFundings)

  Api.get(`${base}/auth/repay`, CoinbaseProController.repay)

  Api.get(`${base}/auth/margin_transfer`, CoinbaseProController.marginTransfer)

  Api.get(`${base}/auth/close_position`, CoinbaseProController.closePosition)

  Api.get(`${base}/auth/convert`, CoinbaseProController.convert)

  Api.get(`${base}/auth/deposit`, CoinbaseProController.deposit)

  Api.get(`${base}/auth/withdraw`, CoinbaseProController.withdraw)

  Api.get(`${base}/auth/deposit_crypto`, CoinbaseProController.depositCrypto)

  Api.get(`${base}/auth/withdraw_crpyo`, CoinbaseProController.withdrawCrypto)

  Api.get(`${base}/auth/deposit_payment`, CoinbaseProController.depositPayment)

  Api.get(`${base}/auth/withdraw_payment`, CoinbaseProController.withdrawPayment)

  Api.get(`${base}/auth/trailing_volume`, CoinbaseProController.getTrailingVolume)
}
