<template>
  <div class="navbar" >
    <div v-show="$route.name === 'Dashboard'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <!-- <b-button pill variant="outline-danger" style="float: right;" @click="logout">登出</b-button> -->
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
      <!-- <b-button @click="test()">測試鈕</b-button> -->
    </div>
    <div v-show="$route.name === 'TenderContent'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <!-- <b-button v-if="isOwner" :disabled="!isSave" @click="editTender">編輯</b-button> -->
      <!-- <b-button v-if="isOwner" :disabled="isSave" @click="saveTender">儲存</b-button> -->
      <!-- <b-button v-else-if="isAdd" @click="add">確認</b-button> -->
      <!-- <b-button v-else>去投標</b-button> -->
      <!-- <b-button @click="cancel">返回</b-button> -->
    </div>
    <div v-show="$route.name === 'Register'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <b-button pill variant="outline-danger" style="float: right;" @click="logout">登出</b-button>
      <b-button variant="outline-success" style="float: center;" @click= "registerFirm">確認</b-button>
    </div>
    <div v-show="$route.name === 'Management'" style="width: 100vw">
      <span style="color:white; font-size: 30px; float: center;">營造廠採購交易管理平台</span>
      <!-- <b-button pill variant="outline-warning" style="float: right;" @click="backToDashboard">返回</b-button> -->
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
    ...mapActions('firm', ['saveFirm']),
    async test () {
      // await ethContract.methods
      //   .addTender('範例二', '對')
      //   .send(
      //     {
      //       from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
      //     }
      //   )
      //   .then(function (receipt) {
      //     console.log(receipt)
      //   })
    },
    async addTender () {
      const init = {
        addr: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0], // 待抓當前
        name: '',
        tenderMethod: '', // 招標方式
        procurementProperty: '', // 採購性質
        publishingDate: '', // 公告日
        budgetAmount: '', // 預算金額
        biddingDeadline: '', // 截止投標
        openingDate: '', // 公告日期
        status: 0
      }
      this.setTender(init)
      this.$router.push({ name: 'TenderContent' })
    },
    logout () {
      this.$router.push({ name: 'Login' })
    },
    cancel () {
      this.$router.push({ name: 'Dashboard' })
    },
    editTender () {
      this.setIsSave(false)
    },
    saveTender () {
      this.setIsSave(true)
    },
    async add () {
      const obj = Object.values(this.currentTender).join(', ')
      console.log(obj)
      await ethContract.methods
        .addTender(this.currentTender.name, this.currentTender.subjectProcurement)
        .send(
          {
            from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
          }
        )
        .then(function (receipt) {
          console.log(receipt)
        })
      this.$router.push({ name: 'Dashboard' })
    },
    async registerFirm () {
      await this.saveFirm()
      this.$router.push({ name: 'Dashboard' })
    },
    backToDashboard () {
      this.$router.push({ name: 'Dashboard' })
    }
  },
  watch: {
    currentTender: {
      handler (newVal, oldVal) {
        console.log(!newVal.addr)
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
