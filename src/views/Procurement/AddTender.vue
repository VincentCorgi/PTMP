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
            size="sm"
              style="float: left; width: 50%;"
              v-model="biddingDeadlineDate"
            ></b-form-datepicker>
            <b-form-timepicker
            size="sm"
              style="float: left; width: 50%;"
              v-model="biddingDeadlineTimeValue"
              @context="onContextBiddingDeadline"
            >
            </b-form-timepicker>

          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="6"
            label="開標日期："
          >
            <b-form-datepicker
              size="sm"
              style="float: left; width: 33%;"
              v-model="openingDateDate"
            ></b-form-datepicker>
            <b-form-timepicker
            size="sm"
              style="float: left; width: 33%;"
              v-model="openingDateTimeValue"
              @context="onContextOpeningDate"
            >
            </b-form-timepicker>
            <b-button @click="syncOpeningDate">同截止投標時間</b-button>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="6"
            label="招標相關文件上傳："
          >
            <b-form-file
              size="sm"
              style="float: left; width: 66%;"
              placeholder="請選擇或拖曳檔案至此..."
            >
            </b-form-file>
          </b-form-group>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="success" @click="addTender" style="margin: 70px 0px 0px 800px">確認</b-button>
      </b-col>
    </b-row>
        </b-overlay>
  </b-container>
</template>

<script>
import { ethContract } from '@/service/index.js'
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
      show: false,
      biddingDeadlineDate: '',
      biddingDeadlineTime: '',
      biddingDeadlineTimeValue: '',
      openingDateDate: '',
      openingDateTime: '',
      openingDateTimeValue: ''
    }
  },
  async mounted () {
    const current = new Date()
    const today = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`
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
        const bdl = new Date(this.biddingDeadlineDate)
        bdl.setHours(bdl.getHours() + this.biddingDeadlineTime.hours - 8)
        bdl.setMinutes(bdl.getMinutes() + this.biddingDeadlineTime.minutes)
        const od = new Date(this.openingDateDate)
        od.setHours(od.getHours() + this.openingDateTime.hours - 8)
        od.setMinutes(od.getMinutes() + this.openingDateTime.minutes)

        this.currentTender.biddingDeadline = `${bdl.getFullYear()}/${bdl.getMonth() + 1}/${bdl.getDate()} ${String(bdl.getHours()).padStart(2, '0')}:${String(bdl.getMinutes()).padStart(2, '0')}`
        this.currentTender.openingDate = `${od.getFullYear()}/${od.getMonth() + 1}/${od.getDate()} ${String(od.getHours()).padStart(2, '0')}:${String(od.getMinutes()).padStart(2, '0')}`
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
          .send({ from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0] })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        console.log(this.currentTender)
        this.show = false

        this.$router.push({ name: 'Dashboard' })
      }
    },
    onContextBiddingDeadline (ctx) {
      this.biddingDeadlineTime = ctx
    },
    onContextOpeningDate (ctx) {
      this.openingDateTime = ctx
    },
    syncOpeningDate () {
      console.log()
      this.openingDateDate = this.biddingDeadlineDate
      this.openingDateTime = this.biddingDeadlineTime
      this.openingDateTimeValue = this.biddingDeadlineTimeValue
    }
  }
}
</script>

<style>

</style>
