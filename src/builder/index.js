import Cron from 'node-schedule'
import Exchange from '../models/Exchange'
import coinbaseProClient from '../clients/CoinbasePro'
import kucoinClient from '../clients/Kucoin'
import iOfArrObj from '../utils/iOfArrObj'
import productBuilder from './products'
import kLineBuilder from './klines'
import tradeBuilder from './trades'
import tickerBuilder from './tickers'

const { log, error } = console

export default function() {
  const builders = [
    { fn: productBuilder, cron: '0 20 1 * * *' },
    { fn: tickerBuilder, cron: '0 */10 * * * *' },
    { fn: tradeBuilder, cron: '30 */30 * * * *' },
    { fn: kLineBuilder, cron: '0 45 */2 * * *' },
  ]

  const clientExchanges = [
    { client: coinbaseProClient.initialize(), name: 'coinbasepro', label: 'CoinbasePro' },
    { client: kucoinClient.initialize(), name: 'kucoin', label: 'Kucoin' },
  ]

  function buildData(exchangeId, clientExchange) {
    productBuilder(exchangeId, clientExchange.name, clientExchange.client, () => {
      builders.map(builder => {
        Cron.scheduleJob(builder.cron, () => {
          builder.fn(exchangeId, clientExchange.name, clientExchange.client)
        })
        // builder.fn(exchangeId, clientExchange.name, clientExchange.client)
      })
    })
  }

  function buildThroughExchanges(localExchanges) {
    clientExchanges.map(clientExchange => {
      const i = iOfArrObj(localExchanges, 'name', clientExchange.name)

      if (i > -1) {
        buildData(localExchanges[i].id, clientExchange)
      } else {
        Exchange.save(clientExchange)
          .then(id => buildData(id, clientExchange))
          .catch(error)
      }
    })
  }

  Exchange.getAll()
    .then(buildThroughExchanges)
    .catch(error)
}
