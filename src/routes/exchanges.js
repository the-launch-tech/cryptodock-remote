import ExchangesController from '../controllers/ExchangesController'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default SubApp => {
  const { Roles, Rates } = global.config

  SubApp.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    ExchangesController.getExchanges
  )
  SubApp.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    ExchangesController.saveExchange
  )
}
