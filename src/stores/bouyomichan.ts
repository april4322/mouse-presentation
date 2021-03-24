import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'
import axios from 'axios'
import { defaultSetting } from '@/config'

Vue.use(Vuex)

const state: BouyomiChanParameter = {
  speed: defaultSetting.speed,
  pitch: defaultSetting.pitch,
  volume: defaultSetting.volume,
  type: defaultSetting.type,
  isEnabled: defaultSetting.isEnabled
}

const getters: GetterTree<BouyomiChanParameter, any> = {
  speed: (state: BouyomiChanParameter) => state.speed,
  pitch: (state: BouyomiChanParameter) => state.pitch,
  volume: (state: BouyomiChanParameter) => state.volume,
  type: (state: BouyomiChanParameter) => state.type,
  isEnabled: (state: BouyomiChanParameter) => state.isEnabled,
  all: (state: BouyomiChanParameter) => {
    return {
      speed: state.speed,
      pitch: state.pitch,
      volume: state.volume,
      type: state.type,
      isEnabled: state.isEnabled
    }
  }
}

const mutations: MutationTree<BouyomiChanParameter> = {
  setAll (state, params: BouyomiChanParameter): void {
    state.speed = params.speed
    state.pitch = params.pitch
    state.volume = params.volume
    state.type = params.type
    state.isEnabled = params.isEnabled
  }
}

const actions: ActionTree<BouyomiChanParameter, any> = {
  async init({ commit }) {
    const res = await axios.get('/api/admin/bouyomichan')
    const bouyomichanParams: BouyomiChanParameter = {
      speed: res.data.params.speed,
      pitch: res.data.params.pitch,
      volume: res.data.params.volume,
      type: res.data.params.type,
      isEnabled: res.data.params.isEnabled === 1 ? true : false
    }
    commit('setAll', bouyomichanParams)
  },
  async setAll({ commit }, params: BouyomiChanParameter) {
    await axios.post('/api/admin/bouyomichan', params)
    commit('setAll', params)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}