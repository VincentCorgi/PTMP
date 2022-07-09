<template>
  <b-container fluid>
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
  </b-container>
</template>

<script>
import { ethContract } from '@/service/index.js'
import { mapState } from 'vuex'
export default {
  name: 'AddTender',
  data () {
    return {
      procurementProperties: [
        '工程類',
        '財務類',
        '勞務類'
      ],
      tenderMethods: [
        '公開招標',
        '選擇性招標',
        '限制性招標'
      ]
    }
  },
  computed: {
    ...mapState({
      currentTender: state => state.tender.current
    })
  },
  methods: {
    async addTender () {
      // await ethContract.methods
      //   .addTender(this.currentTender.name, this.currentTender.subjectProcurement)
      //   .send(
      //     {
      //       from: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
      //     }
      //   )
      //   .then(function (receipt) {
      //   })
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style>

</style>
