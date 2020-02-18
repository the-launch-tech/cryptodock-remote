export default function(error, req, res, next) {
  const { Errors } = global.config

  const errorReducer = {
    TOKEN_ERROR: { code: 403, msg: 'Invalid Token Passed In Header.' },
    REQUEST_ERROR: { code: 500, msg: 'Error Processing Request.' },
    RESOURCE_NOT_FOUND: { code: 400, msg: 'Requested Resource Not Found.' },
    USER_EXISTS: { code: 401, msg: 'User Already Exists With Those Credentials.' },
    INCORRECT_PASSWORD: { code: 401, msg: 'You Entered An Incorrect Password Your Email.' },
    INVALID_PARAMETERS: { code: 400, msg: 'Incomplete Or Invalid Parameters.' },
    DEFAULT_ERROR: { code: 500, msg: 'Server Error.' },
  }

  const errorAction = errorReducer[typeof error === 'string' ? error : Errors.DefaultError]

  const { code, message } = errorAction ? errorAction : errorReducer.DEFAULT_ERROR

  return res.status(code).json({ message, error })
}
