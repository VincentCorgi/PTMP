<template>
  <div>
    <button @click="signIn">登入</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  props: {},
  computed: {},
  async mounted () {},
  methods: {
    // get () {
    //   // web3前面必須有window
    //   const Web3 = require('@/util/getWeb3')
    //   Web3.default.getWeb3().then((res) => {
    //     window.web3 = res
    //     console.log('getWeb3', res)
    //   })
    // },
    signIn () {
      if (window.ethereum) {
        window.ethereum.enable().then((res) => {
          alert('當前錢包地址：' + res[0])
          this.$router.push({ name: 'Dashboard' })
        })
      } else {
        alert('請安裝MetaMask錢包')
      }
    }
  }
}
</script>

<style>
</style>
