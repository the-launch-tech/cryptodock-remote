export default (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://cryptodock.tech, https://builder.cryptodock.tech'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,X-Cd-Token,Content-Type,Access-Control-Allow-Origin'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
}
