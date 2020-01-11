import LocalController from '../controllers/LocalController'
import KucoinController from '../controllers/KucoinController'
import CoinbaseProController from '../controllers/CoinbaseProController'
import local from './local'
import kucoin from './kucoin'
import coinbasepro from './coinbasepro'

export default Router => {
  local(Router, new LocalController(), 'local')
  kucoin(Router, new KucoinController(), 'kucoin')
  coinbasepro(Router, new CoinbaseProController(), 'coinbasepro')
}
