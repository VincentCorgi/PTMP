export default {
  namespaced: true,
  state: {
    current: '',
    isOwner: true,
    isSave: true
  },
  mutations: {
    setTender (state, current) {
      state.current = current
    },
    setIsOwner (state, isOwner) {
      state.isOwner = isOwner
    },
    setIsSave (state, isSave) {
      state.isSave = isSave
    }
  }
}
