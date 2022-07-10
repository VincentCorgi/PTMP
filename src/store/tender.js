export default {
  namespaced: true,
  state: {
    current: {
      tenderer: {
        addr: '',
        name: 'sdfasdf',
        contactAddress: 'bbsdfasdfb',
        contact: 'ccsdfasdfc',
        contactNumber: 'ddfasdfasddd',
        email: 'asfasd@gamil.com'
      },
      name: '「原住民族部落環境基本調查、部落溝通及國土功能分區劃設作業」委託專業服務勞務採購案', // 標案名稱
      tenderMethod: '限制性招標', // 招標方式
      procurementProperty: '勞務類', // 採購性質
      publishingDate: '2022-7-08', // 公告日
      budgetAmount: 4160000, // 預算金額
      biddingDeadline: '2022-07-18', // 截止投標
      openingDate: '2022-07-19', // 開標日期
      bidders: [], // 投標資料
      awardTender: {}, // 得標廠商
      status: 0
    },
    list: [],
    isSave: true
  },
  getters: {
    tenderList (state) {
      const list = state.list
      return list
    }
  },
  mutations: {
    setTender (state, current) {
      state.current = current
    },
    setIsSave (state, isSave) {
      state.isSave = isSave
    },
    setTenderList (state, list) {
      state.list = list
    }
  },
  actions: {
    lookupTenderList ({ commit }) {

    }
  }
}
