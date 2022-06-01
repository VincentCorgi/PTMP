export default {
  namespaced: true,
  state: {
    current: '',
    isSave: true
  },
  mutations: {
    setTender (state, current) {
      state.current = current
    },
    setIsSave (state, isSave) {
      state.isSave = isSave
    }
  }
}
