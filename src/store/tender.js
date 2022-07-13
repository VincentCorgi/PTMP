import { ethContract } from '@/service/index.js'
export default {
  namespaced: true,
  state: {
    current: {},
    list: [],
    isSave: true
  },
  getters: {
    tenderList (state, getters, rootState) {
      const today = Date.now()
      const list = state.list.filter(item =>
        rootState.selectedItem === '招標查詢'
          ? new Date(item.openingDate) > today
          : new Date(item.openingDate) < today
      )
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
    async getAmountTender () {
      const amount = await ethContract.methods
        .amountTender()
        .call()
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
      return amount
    },
    async lookupTenderList ({ rootState, commit, dispatch }) {
      const currentTime = Date.now()
      const list = []
      const amount = await dispatch('getAmountTender')
      for (let i = 0; i < amount; i++) {
        const tender = await ethContract.methods
          .tenders(i)
          .call()
          .then(res => {
            return res
          })
          .catch(err => {
            console.log(err)
          })
        tender.tenderer = await dispatch('firm/lookupFirm', tender.addr, { root: true })
        if (new Date(tender.openingDate) < currentTime) {
          const biddersAddress = await ethContract.methods
            .getBiddersAddress(tender.id)
            .call()
            .then(res => {
              return res
            })
            .catch(err => {
              console.log(err)
            })
          if (biddersAddress.length !== 0) {
            tender.bidders = []
            for (let i = 0; i < biddersAddress.length; i++) {
              const element = biddersAddress[i]
              const bid = await ethContract.methods
                .lookupBidder(tender.id, element)
                .call()
                .then(res => {
                  return res
                })
                .catch(err => {
                  console.log(err)
                })
              bid.bidder = await dispatch('firm/lookupFirm', Object.values(bid)[0], { root: true })
              bid.price = Object.values(bid)[1]
              bid.exerciseDate = Object.values(bid)[2]
              bid.isSME = Object.values(bid)[3]
              tender.bidders.push(bid)
            }
            let awardTender
            let price = 1000000000000
            for (let i = 0; i < tender.bidders.length; i++) {
              const element = tender.bidders[i]
              if (element.price < price) {
                price = element.price
                awardTender = element
              }
            }
            tender.awardTender = awardTender
            tender.awardAmount = awardTender.price
          } else {
            tender.awardAmount = '無'
          }
        }
        list.push(tender)
      }
      commit('setTenderList', list)
    },
    async addTenderBidder ({ commit }, { tenderId, bidderInfo }) {
      await ethContract.methods
        .addTenderBidder(
          tenderId,
          bidderInfo.price,
          bidderInfo.exerciseDate,
          bidderInfo.isSME
        )
        .send({ from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0] })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
