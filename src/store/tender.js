export default {
  namespaced: true,
  state: {
    current: {
      tenderer: {
        addr: '',
        name: '',
        contactAddress: '',
        contact: '',
        contactNumber: ''
      },
      name: '', // 標案名稱
      tenderMethod: '', // 招標方式
      procurementProperty: '', // 採購性質
      publishingDate: '', // 公告日
      budgetAmount: '', // 預算金額
      biddingDeadline: '', // 截止投標
      openingDate: '', // 公告日期
      bidders: [], // 投標資料
      status: ''
    },
    tenderList: [],
    isSave: true
  },
  mutations: {
    setTender (state, current) {
      state.current = current
    },
    setIsSave (state, isSave) {
      state.isSave = isSave
    },
    setTenderList (state, tenderList) {
      state.tenderList = tenderList
    }
  },
  actions: {
    lookupTenderList ({ commit }) {

    }
  }
}
