<template>
  <div class="navbar">
    <div v-show="$route.name === 'Dashboard'">
        <b-button pill variant="outline-danger" style="float: right;" @click="logout">登出</b-button>
        <b-button variant="outline-primary" style="float: right;" @click="addTender">新增招標</b-button>
        <b-button @click="test">測試鈕</b-button>
    </div>
    <div v-show="$route.name === 'AddTender'">
      <b-button @click="save">確認</b-button>
      <b-button @click="back">取消</b-button>
    </div>
  </div>
</template>

<script>
import { ethContract, fromAddress } from '@/service/index.js'

export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    async test () {
      await ethContract.methods
        .addTender('範例二', '對')
        .send(
          {
            from: fromAddress
          }
        )
        .then(function (receipt) {
          console.log(receipt)
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
