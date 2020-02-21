export default (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://cryptodock.tech,https://builder.cryptodock.tech'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,x-cd-token,Content-Type,Access-Control-Allow-Origin,Authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
}
