<template>
  <div class="navbar" >
    <div v-show="$route.name === 'Dashboard'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <b-nav-item-dropdown
        right
        variant="secondary"
        :text="currentFirm.name"
        style="float: right; margin-top: -30px; font-size: 20px; font-color: gray;"
      >
        <b-dropdown-item to="Management">
          使用者管理
        </b-dropdown-item>
        <b-dropdown-item to="Login">
          登出
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </div>
    <div v-show="$route.name === 'TenderContent'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
    </div>
    <div v-show="$route.name === 'Register'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <b-button pill variant="outline-danger" style="float: right;" @click="logout">登出</b-button>
    </div>
    <div v-show="$route.name === 'Management'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
                <b-button
            style="float: right; border-radius: 10px; margin: 0px 0px 0px 0px; font-weight: bold;"
            variant="warning"
          >編輯</b-button>
    </div>
    <div v-show="$route.name === 'AddTender'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
    </div>
    <div v-show="$route.name === 'AwardTender'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
    </div>
  </div>
</template>

<script>
import { ethContract } from '@/service/index.js'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      isAdd: false,
      isOwner: true
    }
  },
  computed: {
    ...mapState({
      currentTender: state => state.tender.current,
      currentFirm: state => state.firm.current,
      isSave: state => state.tender.isSave
    })
  },
  methods: {
    ...mapMutations('tender', ['setTender', 'setIsOwner', 'setIsSave']),
    logout () {
      this.$router.push({ name: 'Login' })
    },
    cancel () {
      this.$router.push({ name: 'Dashboard' })
    },

    backToDashboard () {
      this.$router.push({ name: 'Dashboard' })
    }
  },
  watch: {
    currentTender: {
      handler (newVal, oldVal) {
        if (newVal.name === '') {
          // this.setIsOwner(false)
          this.isOwner = false
          this.isAdd = true
        } else {
          this.isAdd = false
          if (newVal.name === '範例一標案') {
            this.isOwner = true
          } else {
            this.isOwner = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #000 !important;
}
</style>
