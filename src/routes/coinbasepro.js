import CoinbaseProController from '../controllers/coinbasepro/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('coinbaseproRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/public/products`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProducts
  )
  CryptoDock.get(
    `/public/products/:pair/orderbook`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductOrderBook
  )
  CryptoDock.get(
    `/public/products/:pair/ticker`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductTicker
  )
  CryptoDock.get(
    `/public/products/:pair/trades`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductTrades
  )
  CryptoDock.get(
    `/public/products/:pair/historic`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductHistoricRates
  )
  CryptoDock.get(
    `/public/products/:pair/24_hours`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProduct24HrStats
  )
  CryptoDock.get(
    `/public/public/currencies`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getCurrencies
  )
  CryptoDock.get(
    `/public/time`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getTime
  )
  CryptoDock.get(
    `/auth/accounts/coinbase`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getCoinbaseAccounts
  )
  CryptoDock.get(
    `/auth/accounts/payment_methods`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getPaymentMethods
  )
  CryptoDock.get(
    `/auth/accounts`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccounts
  )
  CryptoDock.get(
    `/auth/accounts/:accountID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccount
  )
  CryptoDock.get(
    `/auth/accounts/:accountID/history`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountHistory
  )
  CryptoDock.get(
    `/auth/accounts/:accountID/transfers`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountTransfers
  )
  CryptoDock.get(
    `/auth/accounts/:accountID/holds`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountHolds
  )
  CryptoDock.get(
    `/auth/buy/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.buy
  )
  CryptoDock.get(
    `/auth/sell/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.sell
  )
  CryptoDock.get(
    `/auth/orders/place/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.placeOrder
  )
  CryptoDock.get(
    `/auth/orders/cancel/:orderID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelOrder
  )
  CryptoDock.get(
    `/auth/orders/cancel/open`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelOrders
  )
  CryptoDock.get(
    `/auth/orders/cancel/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelAllOrders
  )
  CryptoDock.get(
    `/auth/orders`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getOrders
  )
  CryptoDock.get(
    `/auth/orders/:orderID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getOrder
  )
  CryptoDock.get(
    `/auth/fills/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getFills
  )
  CryptoDock.get(
    `/auth/fundings`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getFundings
  )
  CryptoDock.get(
    `/auth/repay`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.repay
  )
  CryptoDock.get(
    `/auth/margin_transfer`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.marginTransfer
  )
  CryptoDock.get(
    `/auth/close_position`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.closePosition
  )
  CryptoDock.get(
    `/auth/convert`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.convert
  )
  CryptoDock.get(
    `/auth/deposit`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.deposit
  )
  CryptoDock.get(
    `/auth/withdraw`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdraw
  )
  CryptoDock.get(
    `/auth/deposit_crypto`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.depositCrypto
  )
  CryptoDock.get(
    `/auth/withdraw_crpyo`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdrawCrypto
  )
  CryptoDock.get(
    `/auth/deposit_payment`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.depositPayment
  )
  CryptoDock.get(
    `/auth/withdraw_payment`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdrawPayment
  )
  CryptoDock.get(
    `/auth/trailing_volume`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getTrailingVolume
  )
}
