<template>
  <div class="navbar">
    <span style="color: white">Navbar</span>
    <div v-show="$route.name === 'Dashboard'">
      <button @click="addTender">新增招標</button>
      <button @click="logout">登出</button>
      <button @click="searchETH">查詢錢包ETH餘額</button>
      <button @click="test">測試鈕</button>
    </div>
    <div v-show="$route.name === 'AddTender'">
      <button @click="save">確認</button>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
import { BIconWindowSidebar, LayoutPlugin } from 'bootstrap-vue'
import Web3 from 'web3'
import Web3Utils from 'web3-utils'
export default {
  name: 'Navbar',
  data () {
    return {
      address: '',
      name: ''
    }
  },
  methods: {
    searchETH () {
      const web3 = new Web3(window.web3.currentProvider)
      console.log(web3)
      const fromAddress = web3.eth.accounts[0]
      console.log(fromAddress)
      web3.eth.getBalance(fromAddress, (err, res) => {
        if (!err) {
          console.log(res)
          console.log(res.toNumber())
          console.log('ETH餘額==', res.toNumber() / Math.pow(10, 18))
          // alert(`ETH餘額=${res.toNumber() / Math.pow(10, 18)}`)
        }
      })
    },
    async test () {
      // 建立web3
      const web3 = new Web3(window.web3.currentProvider)
      web3.eth.getBlockNumber().then(console.log)
      // 拿取當前地址
      const fromAddress = web3.eth.accounts[0]
      this.address = fromAddress
      // 合約地址
      const contractAddress = '0xFE0da3c22a75266cC00B792d0C3A4C678d6390bb'
      // 合約abi
      const contractABI = [
        {
          inputs: [],
          name: 'lookupTenderName',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'retrieve',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'num',
              type: 'uint256'
            }
          ],
          name: 'store',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: 'str',
              type: 'string'
            }
          ],
          name: 'writeTenderName',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]

      // 連接合約
      const ethContract = web3.eth.contract(contractABI).at(contractAddress)

      // 使用sendTransaction()
      // const sendData = ethContract.writeTenderName.getData('星空')
      // web3.eth.sendTransaction(
      //   {
      //     from: fromAddress,
      //     to: contractAddress,
      //     data: sendData
      //   },
      //   function (err, hash) {
      //     if (!err) {
      //       console.log(hash)
      //     }
      //   }
      // )

      // 使用call
      const callData = ethContract.lookupTenderName.getData()
      // const hash = function (err, hash) {
      //   if (!err) {
      //     console.log(hash)
      //     console.log(Web3Utils.hexToUtf8(hash))
      //     this.name = Web3Utils.hexToUtf8(hash)
      //     return Web3Utils.hexToUtf8(hash)
      //   }
      // }
      // const aaa = web3.eth.call(
      //   {
      //     to: contractAddress,
      //     data: callData
      //   },
      //   hash
      // )
    },
    addTender () {
      this.$router.push({ name: 'AddTender' })
    },
    logout () {
      this.$router.push({ name: 'Login' })
    },
    save () {
      this.$router.push({ name: 'Dashboard' })
    },
    back () {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #000 !important;
}
</style>
