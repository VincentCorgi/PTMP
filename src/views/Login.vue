<template>
  <b-container fluid>
    <b-row class="vh-100" align-v="center">
      <b-col>
        <b-button variant="success" @click="signIn">連接MetaMask錢包並登入</b-button>
      </b-col>
    </b-row>
  </b-container>
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
    async signIn () {
      if (window.ethereum) {
        await window.ethereum.enable().then((res) => {
          return res[0]
        })
        this.$router.push({ name: 'Dashboard' })
      } else {
        alert('請安裝MetaMask錢包')
      }
    }
  }
}
</script>

<style>
</style>
