import UsersController from '../controllers/UsersController'
import checkRoles from '../middleware/checkRoles'
import limitRates from '../middleware/limitRates'

const { log, error } = console

export default SubApp => {
  const { Roles, Rates, Errors } = global.config

  SubApp.post('/register', limitRates(Rates.Basic), UsersController.register)
  SubApp.post('/login', limitRates(Rates.Basic), UsersController.login)
  SubApp.get('/logout', limitRates(Rates.Basic), UsersController.logout)
  SubApp.get('/current', limitRates(Rates.Premum), UsersController.current)
  SubApp.put(
    '/:id',
    checkRoles([Roles.Admin, Roles.User]),
    limitRates(Rates.Basic),
    UsersController.update
  )
  SubApp.delete(
    '/:id',
    checkRoles([Roles.Admin, Roles.User]),
    limitRates(Rates.Basic),
    UsersController.delete
  )
}
