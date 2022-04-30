<template>
  <div class="navbar">
    <span style="color: white">Navbar</span>
    <div v-show="$route.name === 'Dashboard'">
      <button @click="addTender">新增招標</button>
      <button @click="logout">登出</button>
      <button @click="searchETH">查詢錢包ETH餘額</button>
      <button @click="searchToken">查詢代幣餘額</button>
    </div>
    <div v-show="$route.name === 'AddTender'">
      <button @click="save">確認</button>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
export default {
  name: 'Navbar',
  methods: {
    searchETH () {
      const web3 = new Web3(window.web3.currentProvider)
      console.log(web3)
      const fromAddress = web3.eth.accounts[0]
      console.log(fromAddress)
      web3.eth.getBalance(fromAddress, (err, res) => {
        if (!err) {
          console.log('ETH餘額==', res.toNumber() / Math.pow(10, 18))
        }
      })
    },
    searchToken () {
      const web3 = new Web3(window.web3.currentProvider)
      const fromAddress = web3.eth.accounts[0]
      const ethContract = web3.eth.contract('代幣合約Abi')
      console.log(ethContract)
      const functionInstance = ethContract.at('代幣合約地址')
      console.log(functionInstance)
      functionInstance.balanceOf(fromAddress, (err, res) => {
        if (!err) {
          // 代幣精度根據所發行的代幣合約精度換算
          console.log('代幣餘額==', res.toNumber() / Math.pow(10, 18))
        }
      })
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
