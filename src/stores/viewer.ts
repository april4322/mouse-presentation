import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

const state: ViewerParameter = {
  isNiconico: true,
  isMsgWindowShow: true
}

const getters: GetterTree<ViewerParameter, any> = {
  isNiconico: (state: ViewerParameter) => state.isNiconico,
  isMsgWindowShow: (state: ViewerParameter) => state.isMsgWindowShow,
  all: (state: ViewerParameter) => {
    return {
      isNiconico: state.isNiconico,
      isMsgWindowShow: state.isMsgWindowShow
    }
  }
}

const mutations: MutationTree<ViewerParameter> = {
  setIsNiconico (state, isNiconico: boolean): void {
    state.isNiconico = isNiconico
  },
  setIsMsgWindowShow (state, isMsgWindowShow: boolean): void {
    state.isMsgWindowShow = isMsgWindowShow
  }
}

const actions: ActionTree<ViewerParameter, any> = {
  setIsNiconico({ commit }, isNiconico: boolean) {
    commit('setIsNiconico', isNiconico)
  },
  setIsMsgWindowShow({ commit }, isMsgWindowShow: boolean) {
    commit('setIsMsgWindowShow', isMsgWindowShow)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}