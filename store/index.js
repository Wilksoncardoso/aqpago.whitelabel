
import Vuex from 'vuex'
import * as link from './link__store'
// import * as auth from './auth'
import * as load_session from './load-session'
import * as user from './user'
import * as saldo from './saldo'

const store = () => {
  return new Vuex.Store({
    modules: {
      link,
      // auth,
      user,
      saldo,
      load_session
    }
  })
}

export default store