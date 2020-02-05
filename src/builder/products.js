import moment from 'moment'
import Product from '../models/Product'
import exchangeMap from '../utils/exchangeMap'

const { log, error } = console

export default function(exchangeId, exchangeName, Client, callback) {
  log('Products Started', exchangeName)

  const map = exchangeMap[exchangeName]

  function getProducts() {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProducts()
          .then(resolve)
          .catch(error)
      } else if (exchangeName === 'kucoin') {
        Client.getSymbolsList()
          .then(data => resolve(data.data))
          .catch(error)
      }
    })
  }

  function siftUnique(arrOne = [], arrTwo = []) {
    return new Promise((resolve, reject) => {
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

      resolve(uniqueArr)
    })
  }

  function saveUniqueProducts(uniqueProducts) {
    return uniqueProducts.map(async product => {
      return await Product.save(exchangeId, product, map.object)
    })
  }

  function saveProducts(retry) {
    return getProducts().then(exchangeProducts => {
      return Product.getExchangeProducts(exchangeId).then(localProducts => {
        return siftUnique(exchangeProducts, localProducts)
          .then(async unique => await Promise.all(saveUniqueProducts(unique)))
          .then(() => {
            log('Products Complete', exchangeName)
            if (typeof callback === 'function') {
              callback()
            }
          })
      })
    })
  }

  global.RequestBalancer.request(saveProducts, exchangeName, exchangeName)
}
