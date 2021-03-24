import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state: UserState = {
  username: '',
  userId: null
}

const getters: GetterTree<UserState, any> = {
  name: (state: UserState) => state.username,
  userId: (state: UserState) => state.userId
}

const mutations: MutationTree<UserState>  = {
  setUser(state, username: string): void {
    state.username = username
  },
  setUserId(state, userId: number): void {
    state.userId = userId
  }
}

const actions: ActionTree<UserState, any>= {
  async login({ commit }, request){
    const res = await axios.post('/api/user/login', {username: request.username})
    
    if(res.status == 200){
      commit('setUser', request.username)
      commit('setUserId', res.data.userId)  
    }
    return res
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
