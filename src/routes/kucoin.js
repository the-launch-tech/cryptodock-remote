import KucoinController from '../controllers/kucoin/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('kucoinRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/public/currencies`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getCurrencies
  )
  CryptoDock.get(
    `/public/currencies/:currency`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getCurrencyDetail
  )
  CryptoDock.get(
    `/public/prices`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFiatPrice
  )
  CryptoDock.get(
    `/public/markets`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getMarketList
  )
  CryptoDock.get(
    `/public/symbols`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getSymbolsList
  )
  CryptoDock.get(
    `/public/symbols/:pair/tickers`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getTicker
  )
  CryptoDock.get(
    `/public/symbols/all/tickers`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getAllTickers
  )
  CryptoDock.get(
    `/public/symbols/:pair/trades`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getTradeHistories
  )
  CryptoDock.get(
    `/public/symbols/:pair/klines`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getKlines
  )
  CryptoDock.get(
    `/public/symbols/:pair/24_hours`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.get24HourStats
  )
  CryptoDock.get(
    `/public/symbols/:pair/orderbook/part`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getPartOrderBook
  )
  CryptoDock.get(
    `/public/symbols/:pair/orderbook/full`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFullOrderBookAggregated
  )
  CryptoDock.get(
    `/public/symbols/:pair/orderbook/atomic`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFullOrderBookAtomic
  )
}
