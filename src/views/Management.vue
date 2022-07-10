<template>
    <b-container fluid>
      <b-row >
        <b-col cols="6">
          <div style="margin: 50px; font-size: 20px; font-weight: bold">基本資料</div>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="公司名稱："
          >
            <span>{{currentFirm.name}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="公司地址："
          >
            <span>{{currentFirm.contactAddress}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡人："
          >
            <span>{{currentFirm.contact}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="聯絡電話："
          >
            <span>{{currentFirm.contactNumber}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="6"
            content-cols-sm
            content-cols-lg="4"
            label="電子郵件："
          >
            <span>{{currentFirm.email}}</span>
          </b-form-group>
        </b-col>
        <!-- <b-col cols="1"> -->
          <div class="line"></div>
        <!-- </b-col> -->
        <b-col cols="5">
          <div style="margin: 50px; font-size: 20px; font-weight: bold">標案資訊</div>
          <div class="tenderInfo">
            <b-list-group vertical>
              <b-list-group-item
                href="#"
                v-for="(item, index) in currentFirm.tendersInfo"
                :key="index"
              >
              <div>
                <span>標案名稱：</span>
                {{item.name}}
              </div>
              <div>
                <span>招標廠商：</span>
                {{item.tenderer}}
              </div>
              <div>
                <span>得標廠商：</span>
                {{item.successfulBidder}}
              </div>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Management',
  computed: {
    ...mapState({
      currentFirm: state => state.firm.current
    })
  }

}
</script>

<style scoped>
.line{
  float: center;
  width:0.1em;
  height:750px;
  /* margin-right:1em;
  margin-left:3.5em; */
  margin: 1%;
  background: #A6B0DE;;
}
.tenderInfo{
  border-radius: 25px;
  border-style: solid;
  border-width: 3px;
  border-color: rgb(87, 216, 113);
  box-shadow: 7px 10px #888888;
  /* border-color: red; */
  max-height:70vh;
  overflow-y:scroll;
}
</style>
