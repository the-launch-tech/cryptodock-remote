import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'

const { log, error } = console

export default class UsersController {
  static current(req, res) {
    return res.status(200).send(req.user)
  }

  static async single(req, res, next) {
    try {
      const { Errors } = global.config
      const user = await User.single({ key: 'id', value: req.params.id })
      if (!user) {
        return next(Errors.ResourceNotFound)
      } else {
        return res.status(200).json(user)
      }
    } catch (err) {
      return next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const { Errors } = global.config
      const user = await User.single({ key: 'email', value: req.body.email })
      if (user) {
        return next(Errors.UserExists)
      }
      const salt = await bcrypt.genSalt(10)
      const pw = await bcrypt.hash(req.body.password, salt)
      const id = await User.save(req.body, pw)
      const newUser = { ...req.body, id, pw }
      return res.json(newUser)
    } catch (err) {
      return next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { Errors } = global.config
      const { secret, cookie } = global.config.srv
      const user = await User.single({ key: 'email', value: req.body.email })
      const match = await bcrypt.compare(req.body.password, user.password)
      if (match) {
        const token = await jwt.sign(JSON.stringify({ user, expires: '1d' }), secret)
        res.cookie(cookie, token, { httpOnly: true, secure: true })
        res.status(200).send({ user, token })
      } else {
        return next(Errors.IncorrectPassword)
      }
    } catch (err) {
      return next(err)
    }
  }

  static async update(req, res) {
    try {
      const data = await User.update({ id: req.params.id, fields: req.body.fields })
      return res.status(200).json(data)
    } catch (err) {
      return next(err)
    }
  }

  static logout(req, res, next) {
    req.user = null
    res.redirect(req.get('referer'))
  }

  static async delete(req, res) {
    try {
      const data = await User.delete({ id: req.params.id })
      return res.status(200)
    } catch (err) {
      next(err)
    }
  }
}
