import TradesController from '../controllers/trades/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('tradeRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    TradesController.getTrades
  )
  CryptoDock.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    TradesController.saveTrades
  )
}
