import TickersController from '../controllers/TickersController'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default SubApp => {
  const { Roles, Rates } = global.config

  SubApp.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    TickersController.getTickers
  )
  SubApp.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    TickersController.saveTickers
  )
}
