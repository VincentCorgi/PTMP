import Vue from 'vue'
import Vuex from 'vuex'
import contract from './contract'
import tender from './tender'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    contract,
    tender
  }
})
