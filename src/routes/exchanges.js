import ExchangesController from '../controllers/exchanges/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default Cd => {
  log('exchageRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    ExchangesController.getExchanges
  )
  CryptoDock.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    ExchangesController.saveExchange
  )
}
