import TickersController from '../controllers/tickers/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('tickerRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    TickersController.getTickers
  )
  CryptoDock.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    TickersController.saveTickers
  )
}
