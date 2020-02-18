import jwt from 'jsonwebtoken'

const { log, error } = console

export default async (roles, req, res, next) => {
  const { Errors, srv } = global.config

  const isUser = decodedToken => {
    return decodedToken.role === 'USER' || decodedToken.role === 'ADMIN'
  }

  const validRole = decodedToken => {
    return roles.includes(decodedToken.role)
  }

  const returnToken = (auth, rawToken) => {
    decodedToken.token = rawToken
    req.auth = decodedToken
    return next()
  }

  const token = req.headers['X-Cd-Token']

  if (!token) {
    return next(Errors.TokenError)
  }

  try {
    const decodedToken = await jwt.verify(token, srv.secret)
    if (validRole(decodedToken)) {
      if (isUser(decodedToken)) {
        const user = await User.single({ key: 'email', value: decodedToken.email })
        return returnToken(user, token)
      } else {
        return returnToken(decodedToken, token)
      }
    } else {
      return next(Errors.TokenError)
    }
  } catch (err) {
    return next(Errors.TokenError)
  }
}