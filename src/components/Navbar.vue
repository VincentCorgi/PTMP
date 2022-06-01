<template>
  <div class="navbar">
    <div v-show="$route.name === 'Dashboard'">
      <b-button pill variant="outline-danger" style="float: right;" @click="logout">登出</b-button>
      <b-button variant="outline-primary" style="float: right;" @click="addTender">新增招標</b-button>
      <!-- <b-button @click="test()">測試鈕</b-button> -->
    </div>
    <div v-show="$route.name === 'TenderContent'">
      <b-button v-if="isOwner" :disabled="!isSave" @click="editTender">編輯</b-button>
      <b-button v-if="isOwner" :disabled="isSave" @click="saveTender">儲存</b-button>
      <b-button v-else-if="isAdd">確認</b-button>
      <b-button v-else>去投標</b-button>
      <b-button @click="cancel">返回</b-button>
    </div>
  </div>
</template>

<script>
import { ethContract, fromAddress } from '@/service/index.js'
import { mapMutations, mapState } from 'vuex'
import Web3 from 'web3'

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
      isSave: state => state.tender.isSave
    })
  },
  methods: {
    ...mapMutations('tender', ['setTender', 'setIsOwner', 'setIsSave']),
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
      const init = {
        name: '',
        subjectProcurement: ''
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
