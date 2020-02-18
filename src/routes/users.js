import UsersController from '../controllers/users/index'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default CryptoDock => {
  log('userRoutes')

  const { Roles, Rates } = global.config

  CryptoDock.post('/register', limitRates(Rates.Basic), UsersController.register)
  CryptoDock.post('/login', limitRates(Rates.Basic), UsersController.login)
  CryptoDock.get('/logout', limitRates(Rates.Basic), UsersController.logout)
  CryptoDock.get('/current', limitRates(Rates.Premum), UsersController.current)
  CryptoDock.put(
    '/:id',
    checkRoles([Roles.Admin, Roles.User]),
    limitRates(Rates.Basic),
    UsersController.update
  )
  CryptoDock.delete(
    '/:id',
    checkRoles([Roles.Admin, Roles.User]),
    limitRates(Rates.Basic),
    UsersController.delete
  )
}
