import KlinesController from '../controllers/klines/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('klineRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    KlinesController.getKlines
  )
  CryptoDock.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    KlinesController.saveKlines
  )
}
