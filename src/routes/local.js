export default (Api, LocalController, basePath) => {
  const base = `${process.env.DB_API}/${basePath}`

  Api.get(`${base}/exchanges`, LocalController.getExchanges)

  Api.get(`${base}/products`, LocalController.getProducts)

  Api.get(`${base}/klines`, LocalController.getKlines)

  Api.get(`${base}/tickers`, LocalController.getTickers)

  Api.get(`${base}/trades`, LocalController.getTrades)
}
