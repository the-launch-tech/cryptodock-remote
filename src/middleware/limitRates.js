const { log, error } = console

export default function(defaultRate) {
  let limiter
  let limit = defaultRate

  return function(req, res, next) {
    if (req.auth && req.auth.rate_limit) {
      limit = req.auth.rate_limit
    }

    const limiter = global.RateLimiter[limit]

    return limiter(req, res, next)
  }
}
