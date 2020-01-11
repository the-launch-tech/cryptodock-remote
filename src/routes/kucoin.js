export default (Api, KucoinController, basePath) => {
  const base = `${process.env.DB_API}/${basePath}`

  Api.get(`${base}/currencies`, KucoinController.getCurrencies)

  Api.get(`${base}/currencies/:currency`, KucoinController.getCurrencyDetail)

  Api.get(`${base}/prices`, KucoinController.getFiatPrice)

  Api.get(`${base}/markets`, KucoinController.getMarketList)

  Api.get(`${base}/symbols`, KucoinController.getSymbolsList)

  Api.get(`${base}/symbols/:pair/tickers`, KucoinController.getTicker)

  Api.get(`${base}/symbols/all/tickers`, KucoinController.getAllTickers)

  Api.get(`${base}/symbols/:pair/trades`, KucoinController.getTradeHistories)

  Api.get(`${base}/symbols/:pair/klines`, KucoinController.getKlines)

  Api.get(`${base}/symbols/:pair/24_hours`, KucoinController.get24HourStats)

  Api.get(`${base}/symbols/:pair/orderbook/part`, KucoinController.getPartOrderBook)

  Api.get(`${base}/symbols/:pair/orderbook/full`, KucoinController.getFullOrderBookAggregated)

  Api.get(`${base}/symbols/:pair/orderbook/atomic`, KucoinController.getFullOrderBookAtomic)
}
