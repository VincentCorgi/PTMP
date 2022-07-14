<template>
  <b-container fluid>
    <b-row class="vh-100" align-v="center">
      <b-col>
        <div style="font-size: 50px; margin: 0px 500px 100px 0px;">營造廠採購交易管理平台</div>
        <b-button size="lg" variant="success" @click="signIn" style="margin-right: 500px">連接MetaMask錢包並登入</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ethContract } from '@/service/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {}
  },
  props: {},
  computed: {},
  async mounted () {},
  methods: {
    ...mapMutations('firm', ['setCurrent', 'reset']),
    async signIn () {
      if (window.ethereum) {
        window.ethereum.enable().then((res) => {
          // alert(res[0])
          // console.log(res[0])
        })
        const manufacturer = await ethContract.methods
          .manufacturers((await window.ethereum.request({ method: 'eth_requestAccounts' }))[0])
          .call()
          .then(function (res) {
            return res
          })
          .catch((err) => {
            console.log(err)
          })
        if (manufacturer.addr === '0x0000000000000000000000000000000000000000') {
          this.reset()
          this.$router.push({ name: 'Register' })
        } else {
          this.setCurrent(manufacturer)
          this.$router.push({ name: 'Dashboard' })
        }
      } else {
        alert('請安裝MetaMask錢包')
      }
    }
  }
}
</script>

<style>
</style>
