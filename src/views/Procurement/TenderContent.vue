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
            <span>{{currentFirm.name}}</span>
        </b-form-group>
            <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="公司地址："
          >
            <span>{{currentFirm.contactAddress}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡人："
          >
            <span>{{currentFirm.contact}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡電話："
          >
            <span>{{currentFirm.contactNumber}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="8"
            content-cols-sm
            content-cols-lg="4"
            label="電子郵件："
          >
            <span>{{currentFirm.email}}</span>
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
          />
          <b-button
            size="lg"
            variant="info"
            style="margin: 0px 0px 20px 10px"
            @click="biddingTender"
          >去投標</b-button>
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
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="標案名稱："
          >
            <span style="float: left;">{{ currentTender.name }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="招標方式："
          >
            <span style="float: left;">{{ currentTender.tenderMethod }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="採購性質："
          >
            <span style="float: left;">{{ currentTender.procurementProperty }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="公告日："
          >
            <span style="float: left;">{{ currentTender.publishingDate }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="預算金額："
          >
            <span style="float: left;">{{ currentTender.budgetAmount }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="截止投標："
          >
            <span style="float: left;">{{ currentTender.biddingDeadline }}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            style="padding-left: 20px; margin-bottom: 12px"
            label="開標日期："
          >
            <span style="float: left;">{{ currentTender.openingDate }}</span>
          </b-form-group>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TenderContent',
  computed: {
    ...mapState({
      currentTender: state => state.tender.current,
      currentFirm: state => state.firm.current
    })
  },
  methods: {
    biddingTender () {

    }
  }
}
</script>

<style>
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
