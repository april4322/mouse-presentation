import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'
import { fontSize, fontColor } from '@/config'

Vue.use(Vuex)

const state: ParameterState = {
  size: fontSize.normal,
  color: fontColor.white
}

const getters: GetterTree<ParameterState, any> = {
  size: (state: ParameterState) => state.size,
  color: (state: ParameterState) => state.color
}

const mutations: MutationTree<ParameterState> = {
  setSize (state, size: string): void {
    state.size = size
  },
  setColor (state, color: string): void {
    state.color = color
  }
}

const actions: ActionTree<ParameterState, any> = {
  setSize({ commit }, size) {
    commit('setSize', size)
  },
  setColor({ commit }, color) {
    commit('setColor', color)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}