import Vue from 'vue'
import Vuex from 'vuex'
import contract from './contract'
import tender from './tender'
import firm from './firm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login () {}
  },
  modules: {
    contract,
    tender,
    firm
  }
})
