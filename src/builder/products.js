import RequestBalancer from '../utils/RequestBalancer'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'

const { log, error } = console

module.exports = async function(exchangeId, exchangeName, Client) {
  log('In Product Builder')
  const map = exchangeMap[exchangeName]

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProducts()
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getSymbolsList()
          .then(res => resolve(res.data))
          .catch(reject)
      }
    })
  }

  const siftUnique = (arrOne = [], arrTwo = [], callback) => {
    let uniqueArr = []

    arrOne.map(elOne => {
      let unique = true
      arrTwo.map(elTwo => {
        if (elOne[map.product] === elTwo.pair) {
          unique = false
        }
      })
      if (unique) {
        uniqueArr.push(elOne)
      }
    })

    callback(uniqueArr)
  }

  await RequestBalancer.request(
    retry =>
      getProducts()
        .then(exchangeProducts => {
          Product.getExchangeProducts(exchangeId)
            .then(localProducts => {
              siftUnique(exchangeProducts, localProducts, uniqueProducts => {
                uniqueProducts.map(product => {
                  Product.save(exchangeId, product, map.object).catch(error)
                })
              })
            })
            .catch(error)
        })
        .catch(error),
    exchangeName,
    exchangeName
  ).catch(error)
}
