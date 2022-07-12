<template>
  <b-container fluid>
    <!-- class="vh-100" align-v="center" -->
    <b-row align-h="center">
      <b-col cols="3"></b-col>
      <b-col cols="6">
      <div class="superiorEntity">
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">機關資訊</div>
        <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="公司名稱："
          >
            <span>{{currentTender.tenderer.name}}</span>
        </b-form-group>
            <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="公司地址："
          >
            <span>{{currentTender.tenderer.contactAddress}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡人："
          >
            <span>{{currentTender.tenderer.contact}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡電話："
          >
            <span>{{currentTender.tenderer.contactNumber}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="電子郵件："
          >
            <span>{{currentTender.tenderer.email}}</span>
          </b-form-group>
      </div>
      </b-col>
      <b-col cols="3">
        <div style="margin: 50px 0px 0px 50px">
          <b-icon
            icon="arrow-right"
            animation="cylon"
            font-scale="4"
            style="margin: 20px 10px 0px 0px"
            v-show="currentTime < new Date(currentTender.biddingDeadline)"
          />
          <b-button
            size="lg"
            variant="info"
            style="margin: 0px 0px 20px 10px"
            @click="modalShow = !modalShow"
            v-show="currentTime < new Date(currentTender.biddingDeadline)"
          >去投標</b-button>
          <b-modal id="biddingModal" v-model="modalShow" hide-footer title="填寫投標資訊！！">
            <b-overlay
              :show="show"
              variant="light"
              opacity="0.7"
            >
            <!-- <template #default="{  }"> -->
              <b-form-group
                label-cols-sm="3"
                label-align-sm="left"
                style="padding-left: 20px; margin-bottom: 12px"
                label="投標金額："
              >
                <b-form-input
                  type="number"
                  style="float: left;"
                  v-model="bidder.price"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label-align-sm="left"
                style="padding-left: 20px; margin-bottom: 12px"
                label="履約日期："
              >
                <b-form-datepicker
                 style="float: left; width: 40%; margin-top: 13px;"
                 size="sm"
                 v-model="exerciseDateStart"
                ></b-form-datepicker>
            <div class="p-0" style="margin-top: 20px;">
              ~
            </div>
                <b-form-datepicker
                 style="float: left; width: 40%; margin-left: 20px; margin-top: -30px;"
                  size="sm"
                  v-model="exerciseDateEnd"
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label-align-sm="left"
                style="padding-left: 20px; margin-bottom: 12px"
                label="是否為中小企業："
              >
                <b-form-radio-group
                  :options="isSMEOptions"
                  style="float: left; margin-top: 20px;"
                  v-model="bidder.isSME"
                ></b-form-radio-group>
              </b-form-group>
            <!-- </template> -->
            <!-- <template #modal-footer="{ addBidder, cancel }"> -->
              <b-button
                size="sm"
                variant="success"
                @click="addBidder()"
                style="float: right; margin-left: 10px;"
              >
                確認
              </b-button>
              <b-button
                size="sm"
                variant="danger"
                @click="cancel()"
                style="float: right;"
              >
                取消
              </b-button>
            <!-- </template> -->
        </b-overlay>

          </b-modal>
        </div>
      </b-col>
    </b-row>
    <!-- ------------------------------------------------------------------------------------------ -->
    <b-row align-h="center">
      <b-col></b-col>
      <b-col cols="6">
        <div class="tenderInfo">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">標案資訊</div>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="標案名稱："
          >
            <span style="float: left;">{{ currentTender.name }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="招標方式："
          >
            <span v-show="currentTender.tenderMethod === '0'" style="float: left;">公開招標</span>
            <span v-show="currentTender.tenderMethod === '1'" style="float: left;">選擇性招標</span>
            <span v-show="currentTender.tenderMethod === '2'" style="float: left;">限制性招標</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="採購性質："
          >
            <span v-show="currentTender.procurementProperty === '0'" style="float: left;">工程類</span>
            <span v-show="currentTender.procurementProperty === '1'" style="float: left;">財務類</span>
            <span v-show="currentTender.procurementProperty === '2'" style="float: left;">勞務類</span>  </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="公告日："
          >
            <span style="float: left;">{{ currentTender.publishingDate }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="預算金額："
          >
            <span style="float: left;">{{ currentTender.budgetAmount }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="截止投標："
          >
            <span style="float: left;">{{ currentTender.biddingDeadline }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            style="padding-left: 20px; margin-bottom: 12px"
            label="開標日期："
          >
            <span style="float: left;">{{ currentTender.openingDate }}</span>
          </b-form-group>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col>
        <!-- <div v-if="Object.keys(this.bid).length !== 0">
          aaa
        </div> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ethContract } from '@/service/index.js'

export default {
  name: 'TenderContent',
  data () {
    return {
      isSMEOptions: [
        { text: '是', value: true },
        { text: '否', value: false }
      ],
      exerciseDateStart: '',
      exerciseDateEnd: '',
      bidder: {
        addr: '',
        price: '',
        exerciseDate: '',
        isSME: ''
      },
      show: false,
      modalShow: false,
      bid: {},
      currentTime: ''
    }
  },
  computed: {
    ...mapState({
      currentTender: state => state.tender.current
    })
  },
  async mounted () {
    this.currentTime = Date.now()
    const result = await ethContract.methods
      .lookupBidder(
        this.currentTender.id,
        (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
      )
      .call()
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
      })
    if (result) {
      const bidder = await this.lookupFirm(Object.values(result)[0])
      this.bid.bidder = bidder
      this.bid.price = Object.values(result)[1]
      this.bid.exerciseDate = Object.values(result)[2]
      this.bid.isSME = Object.values(result)[3]
    } else {
      console.log('bbb')
    }
    console.log(this.bid)
  },
  methods: {
    ...mapActions('tender', ['addTenderBidder']),
    ...mapActions('firm', ['lookupFirm']),
    cancel () {
      this.modalShow = false
    },
    async addBidder () {
      this.show = true
      this.bidder.exerciseDate = `${this.exerciseDateStart}~${this.exerciseDateEnd}`
      await this.addTenderBidder({
        tenderId: this.currentTender.id,
        bidderInfo: this.bidder
      })
      this.show = false
      this.modalShow = false
    }
  }
}
</script>

<style scoped>
.superiorEntity{
  margin-top: 10px;
  background-color: rgb(190, 218, 247);
  border-radius: 25px;
}
.tenderInfo{
  margin-top: 20px;
  background-color: rgb(243, 229, 200);
  border-radius: 25px;
}
</style>
