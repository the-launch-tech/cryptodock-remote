export default class Controller {
  constructor() {}

  err(res, status, err, message = 'Error!') {
    return res.status(status).send({ message })
  }
}
