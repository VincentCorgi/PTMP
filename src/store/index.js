import Vue from 'vue'
import Vuex from 'vuex'
import contract from './contract'
import tender from './tender'
import firm from './firm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedItem: '招標查詢'
  },
  getters: {
  },
  mutations: {
    setSelectedItem (state, selectedItem) {
      state.selectedItem = selectedItem
    }
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
