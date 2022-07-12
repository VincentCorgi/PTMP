import { ethContract } from '@/service/index.js'
export default {
  namespaced: true,
  state: {
    current: {
      addr: '',
      name: '',
      contact: '',
      contactNumber: '',
      contactAddress: '',
      email: '',
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
        contactAddress: '',
        email: ''
      }
    }
  },
  actions: {
    async addFirm ({ state }) {
      await ethContract.methods
        .addManufacturer(
          state.current.name,
          state.current.email,
          state.current.contact,
          state.current.contactNumber,
          state.current.contactAddress
        )
        .send(
          {
            from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
          }
        )
        .then(function (receipt) {
          console.log(receipt)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async lookupFirm ({ commit }, addr) {
      const firm = await ethContract.methods
        .manufacturers(addr)
        .call()
        .then(function (res) {
          return res
        })
        .catch((err) => {
          console.log(err)
        })
      return firm
    }
  }
}
