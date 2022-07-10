<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4">
              <div class="superiorEntity">
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">機關資訊</div>
        <b-form-group
            label-cols-sm="4"
            content-cols-sm
            label="公司名稱："
          >
            <span style="float: left;">{{currentTender.tenderer.name}}</span>
        </b-form-group>
            <b-form-group
            label-cols-sm="4"
            content-cols-sm
            label="公司地址："
          >
            <span style="float: left;">{{currentTender.tenderer.contactAddress}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            content-cols-sm
            label="聯絡人："
          >
            <span style="float: left;">{{currentTender.tenderer.contact}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            content-cols-sm
            label="聯絡電話："
          >
            <span style="float: left;">{{currentTender.tenderer.contactNumber}}</span>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            content-cols-sm
            label="電子郵件："
          >
            <span style="float: left;">{{currentTender.tenderer.email}}</span>
          </b-form-group>
      </div>
      </b-col>
      <b-col cols="4">
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
      <b-col cols="4">
        <div class="awardInfo">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">決標資訊</div>
        </div>
      </b-col>
    </b-row>
    <b-row style="margin-top: 50px">
      <b-col cols="12">
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">投標廠商資訊</div>
        <div>
          <b-table
            thead-class="thClass"
            :fields="fields"
            :items="items"
            striped
          >
            <template #cell(items)="row">
             {{ `${row.index +1}` }}
            </template>
            <template #cell(isSME)="row">
             <span v-if="row.value === true">是</span>
             <span v-else>否</span>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AwardTender',
  data () {
    return {
      fields: [
        {
          key: 'items',
          label: '項次',
          sortable: true
        },
        {
          key: 'name',
          label: '廠商名稱',
          sortable: true
        },
        {
          key: 'price',
          label: '投標金額',
          sortable: true
        },
        {
          key: 'exerciseDate',
          label: '履約日期',
          sortable: true
        },
        {
          key: 'isSME',
          label: '是否為中小企業',
          sortable: true
        }
      ],
      items: [
        {
          name: 'aaa',
          price: 'aaa',
          exerciseDate: 'aaa',
          isSME: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      currentTender: state => state.tender.current
    })
  }

}
</script>

<style scoped>
.superiorEntity{
  height: 440px;
  margin-top: 20px;
  background-color: rgb(190, 218, 247);
  border-radius: 25px;
}
.tenderInfo{
  height: 440px;
  margin-top: 20px;
  background-color: rgb(243, 229, 200);
  border-radius: 25px;
}
.awardInfo{
  height: 440px;
  margin-top: 20px;
  background-color: rgb(249, 194, 194);
  border-radius: 25px;
}
.thClass{
  background-color: #acf4ad;
  color: white;
}
</style>
