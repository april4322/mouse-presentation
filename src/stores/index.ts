import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import parameter from './parameter'
import user from './user'
import bouyomichan from './bouyomichan'
import viewer from './viewer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    parameter,
    user,
    bouyomichan,
    viewer
  },
  plugins: [createPersistedState({
    paths: ['bouyomichan', 'viewer']
  })]
})
