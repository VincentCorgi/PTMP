<template>
  <b-container fluid>
            <b-overlay
          :show="show"
          variant="light"
          opacity="0.7"
        >
    <b-row >
      <b-col>
        <div style="margin-top: 50px">
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="標案名稱："
          >
            <b-form-input
              v-model="currentTender.name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="招標方式："
          >
            <b-form-select
              :options="tenderMethods"
              v-model="currentTender.tenderMethod"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="採購性質："
          >
            <b-form-radio-group
              :options="procurementProperties"
              v-model="currentTender.procurementProperty"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="預算金額："
          >
            <b-form-input
            type="number"
              v-model="currentTender.budgetAmount"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="截止投標："
          >
            <b-form-datepicker
              locale="zh"
              v-model="currentTender.biddingDeadline"
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="開標日期："
          >
            <b-form-datepicker
              locale="zh"
              v-model="currentTender.openingDate"
            ></b-form-datepicker>
          </b-form-group>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="success" @click="addTender" style="margin: 70px 0px 0px 600px">確認</b-button>
      </b-col>
    </b-row>
        </b-overlay>
  </b-container>
</template>

<script>
import { ethContract } from '@/service/index.js'
import { mapState } from 'vuex'
export default {
  name: 'AddTender',
  data () {
    return {
      currentTender: {},
      procurementProperties: [
        { text: '工程類', value: 0 },
        { text: '財務類', value: 1 },
        { text: '勞務類', value: 2 }
      ],
      tenderMethods: [
        { text: '公開招標', value: 0 },
        { text: '選擇性招標', value: 1 },
        { text: '限制性招標', value: 2 }
      ],
      show: false
    }
  },
  // computed: {
  //   ...mapState({
  //     currentTender: state => state.tender.current
  //   })
  // },
  async mounted () {
    const current = new Date()
    const today = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    this.currentTender = {
      name: '',
      procurementProperty: '', // 採購性質
      tenderMethod: '公開招標', // 招標方式
      publishingDate: today, // 公告日
      budgetAmount: '', // 預算金額
      biddingDeadline: '', // 截止投標
      openingDate: '' // 公告日期
    }
  },
  methods: {
    async addTender () {
      const yes = confirm('確定要新增嗎？')
      if (yes) {
        this.show = true

        await ethContract.methods
          .addTender(
            this.currentTender.name,
            this.currentTender.procurementProperty,
            this.currentTender.tenderMethod,
            this.currentTender.publishingDate,
            this.currentTender.budgetAmount,
            this.currentTender.biddingDeadline,
            this.currentTender.openingDate
          )
          .send(
            {
              from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
            }
          )
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.show = false

        this.$router.push({ name: 'Dashboard' })
      }
    }
  }
}
</script>

<style>

</style>
