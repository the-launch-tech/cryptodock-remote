import ProductsController from '../controllers/products/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('productRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.get(
    `/`,
    checkRoles([Roles.Builder, Roles.Api]),
    limitRates(Rates.Basic),
    ProductsController.getProducts
  )
  CryptoDock.post(
    `/`,
    checkRoles([Roles.Builder]),
    limitRates(Rates.Basic),
    ProductsController.saveProducts
  )
}
