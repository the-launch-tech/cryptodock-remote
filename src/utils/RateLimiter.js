import RateLimit from 'express-rate-limit'

export default class RateLimiter {
  constructor() {
    this.BASIC = this.initBasic()
    this.PRO = this.initPro()
    this.PREMIUN = this.initPremium()
    this.BUILDER = this.initBuilder()
  }

  initBasic() {
    return RateLimit({
      windowMs: 60 * 1000,
      max: 500,
      keyGenerator: (req, res) => {
        return req.auth ? req.auth.token : req.ip
      },
      message: 'You have Been Rate Limited',
      onLimitReached: (req, res, opts) => {},
      skip: (req, res) => {},
    })
  }

  initPro() {
    return RateLimit({
      windowMs: 60 * 1000,
      max: 500,
      keyGenerator: (req, res) => {
        return req.auth ? req.auth.token : req.ip
      },
      message: 'You have Been Rate Limited',
      onLimitReached: (req, res, opts) => {},
      skip: (req, res) => {},
    })
  }

  initPremium() {
    return RateLimit({
      windowMs: 60 * 1000,
      max: 500,
      keyGenerator: (req, res) => {
        return req.auth ? req.auth.token : req.ip
      },
      message: 'You have Been Rate Limited',
      onLimitReached: (req, res, opts) => {},
      skip: (req, res) => {},
    })
  }

  initBuilder() {
    return RateLimit({
      windowMs: 60 * 1000,
      max: 500,
      keyGenerator: (req, res) => {
        return req.auth ? req.auth.token : req.ip
      },
      message: 'You have Been Rate Limited',
      onLimitReached: (req, res, opts) => {},
      skip: (req, res) => {},
    })
  }
}
