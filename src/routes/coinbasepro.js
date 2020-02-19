import CoinbaseProController from '../controllers/CoinbaseProController'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default SubApp => {
  const { Roles, Rates } = global.config

  SubApp.get(
    `/public/products`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProducts
  )
  SubApp.get(
    `/public/products/:pair/orderbook`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductOrderBook
  )
  SubApp.get(
    `/public/products/:pair/ticker`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductTicker
  )
  SubApp.get(
    `/public/products/:pair/trades`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductTrades
  )
  SubApp.get(
    `/public/products/:pair/historic`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProductHistoricRates
  )
  SubApp.get(
    `/public/products/:pair/24_hours`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getProduct24HrStats
  )
  SubApp.get(
    `/public/public/currencies`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getCurrencies
  )
  SubApp.get(
    `/public/time`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    CoinbaseProController.getTime
  )
  SubApp.get(
    `/auth/accounts/coinbase`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getCoinbaseAccounts
  )
  SubApp.get(
    `/auth/accounts/payment_methods`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getPaymentMethods
  )
  SubApp.get(
    `/auth/accounts`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccounts
  )
  SubApp.get(
    `/auth/accounts/:accountID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccount
  )
  SubApp.get(
    `/auth/accounts/:accountID/history`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountHistory
  )
  SubApp.get(
    `/auth/accounts/:accountID/transfers`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountTransfers
  )
  SubApp.get(
    `/auth/accounts/:accountID/holds`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getAccountHolds
  )
  SubApp.get(
    `/auth/buy/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.buy
  )
  SubApp.get(
    `/auth/sell/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.sell
  )
  SubApp.get(
    `/auth/orders/place/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.placeOrder
  )
  SubApp.get(
    `/auth/orders/cancel/:orderID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelOrder
  )
  SubApp.get(
    `/auth/orders/cancel/open`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelOrders
  )
  SubApp.get(
    `/auth/orders/cancel/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.cancelAllOrders
  )
  SubApp.get(
    `/auth/orders`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getOrders
  )
  SubApp.get(
    `/auth/orders/:orderID`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getOrder
  )
  SubApp.get(
    `/auth/fills/:pair`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getFills
  )
  SubApp.get(
    `/auth/fundings`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getFundings
  )
  SubApp.get(
    `/auth/repay`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.repay
  )
  SubApp.get(
    `/auth/margin_transfer`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.marginTransfer
  )
  SubApp.get(
    `/auth/close_position`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.closePosition
  )
  SubApp.get(
    `/auth/convert`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.convert
  )
  SubApp.get(
    `/auth/deposit`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.deposit
  )
  SubApp.get(
    `/auth/withdraw`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdraw
  )
  SubApp.get(
    `/auth/deposit_crypto`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.depositCrypto
  )
  SubApp.get(
    `/auth/withdraw_crpyo`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdrawCrypto
  )
  SubApp.get(
    `/auth/deposit_payment`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.depositPayment
  )
  SubApp.get(
    `/auth/withdraw_payment`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.withdrawPayment
  )
  SubApp.get(
    `/auth/trailing_volume`,
    checkRoles([Roles.Builder, Roles.AuthApi]),
    limitRates(Rates.Basic),
    CoinbaseProController.getTrailingVolume
  )
}
