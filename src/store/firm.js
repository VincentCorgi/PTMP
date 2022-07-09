export default {
  namespaced: true,
  state: {
    current: {
      name: '',
      contact: '',
      contactNumber: '',
      contactAddress: ''
    }
  },
  mutations: {
    setCurrent (state, firm) {
      state.firm = firm
    }
  },
  actions: {
    saveFirm ({ state }) {

    }
  }
}
