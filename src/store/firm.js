export default {
  namespaced: true,
  state: {
    current: {
      addr: '',
      name: 'aaa',
      contact: 'bbb',
      contactNumber: 'ccc',
      contactAddress: 'ddd',
      tendersInfo: [
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        },
        {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        }, {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        }, {
          name: 'aaa',
          tenderer: 'aafd',
          successfulBidder: 'ttt'
        }

      ]
    }
  },
  mutations: {
    setCurrent (state, firm) {
      state.current = firm
    },
    reset (state) {
      state.current = {
        name: '',
        contact: '',
        contactNumber: '',
        contactAddress: ''
      }
    }
  },
  actions: {
    saveFirm ({ state }) {

    }
  }
}
