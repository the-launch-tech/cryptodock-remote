import KucoinController from '../controllers/KucoinController'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default SubApp => {
  const { Roles, Rates } = global.config

  SubApp.get(
    `/public/currencies`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getCurrencies
  )
  SubApp.get(
    `/public/currencies/:currency`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getCurrencyDetail
  )
  SubApp.get(
    `/public/prices`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFiatPrice
  )
  SubApp.get(
    `/public/markets`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getMarketList
  )
  SubApp.get(
    `/public/symbols`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getSymbolsList
  )
  SubApp.get(
    `/public/symbols/:pair/tickers`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getTicker
  )
  SubApp.get(
    `/public/symbols/all/tickers`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getAllTickers
  )
  SubApp.get(
    `/public/symbols/:pair/trades`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getTradeHistories
  )
  SubApp.get(
    `/public/symbols/:pair/klines`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getKlines
  )
  SubApp.get(
    `/public/symbols/:pair/24_hours`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.get24HourStats
  )
  SubApp.get(
    `/public/symbols/:pair/orderbook/part`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getPartOrderBook
  )
  SubApp.get(
    `/public/symbols/:pair/orderbook/full`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFullOrderBookAggregated
  )
  SubApp.get(
    `/public/symbols/:pair/orderbook/atomic`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KucoinController.getFullOrderBookAtomic
  )
}
