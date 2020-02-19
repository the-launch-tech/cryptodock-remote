export default function() {
  const parseVar = slug => {
    return process.env.NODE_ENV === 'production' ? process.env[slug] : process.env['DEV_' + slug]
  }

  return {
    Rates: {
      Basic: 'BASIC',
      Pro: 'PRO',
      Premium: 'PREMIUM',
      Builder: 'BUILDER',
    },
    Roles: {
      User: 'USER',
      Admin: 'ADMIN',
      Api: 'API',
      AuthApi: 'AUTH_API',
      Builder: 'BUILDER',
    },
    Errors: {
      TokenError: 'TOKEN_ERROR',
      RequestError: 'REQUEST_ERROR',
      ResourceNotFound: 'RESOURCE_NOT_FOUND',
      DefaultError: 'DEFAULT_ERROR',
      IncorrectPassword: 'INCORRECT_PASSWORD',
      UserExists: 'USER_EXISTS',
      InvalidParameters: 'INVALID_PARAMETERS',
    },
    db: {
      name: parseVar('DB_NAME'),
      user: parseVar('DB_USER'),
      pw: parseVar('DB_PASSWORD'),
      host: parseVar('DB_HOST'),
    },
    srv: {
      port: parseVar('PORT'),
      version: parseVar('VERSION'),
      secret: parseVar('SECRET'),
      cookie: parseVar('COOKIE'),
    },
    api: {
      baseUrl: parseVar('API_BASE_URL'),
    },
    keys: {
      kucoinKey: parseVar('KUCOIN_API_KEY'),
      kucoinSecret: parseVar('KUCOIN_API_SECRET'),
      coinbaseproPw: parseVar('COINBASEPRO_API_PASSWORD'),
      coinbaseproKey: parseVar('COINBASEPRO_API_KEY'),
      coinbaseproSecret: parseVar('COINBASEPRO_API_SECRET'),
      coinbaseproBaseUrl: parseVar('COINBASEPRO_BASE_URL'),
      krakenKey: parseVar('KRAKEN_API_KEY'),
      krakenSecret: parseVar('KRAKEN_API_SECRET'),
      binanceKey: parseVar('BINANCE_API_KEY'),
      binanceSecret: parseVar('BINANCE_API_SECRET'),
    },
  }
}
