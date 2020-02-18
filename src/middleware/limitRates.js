export default function(defaultRate, req, res, next) {
  let limit = defaultRate

  if (req.auth && req.auth.rate_limit) {
    limit = req.auth.rate_limit
  }

  if (global.RateLimiter[limit]) {
    limiter = global.RateLimiter[limit]
  }

  return limiter
}
