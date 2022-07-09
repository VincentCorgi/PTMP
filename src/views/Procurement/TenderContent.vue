<template>
  <b-container fluid>
    <!-- class="vh-100" align-v="center" -->
    <b-row align-h="center">
      <b-col cols="6">
      <div class="superiorEntity">
        <div style="font-size: 20px; font-weight: bold; ">機關資訊</div>
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
    </b-row>
    <!-- --------------------------------------------------------------- -->
    <b-row align-h="center">
      <b-col class="">
        <b-row align-h="center">
          <b-col cols="2">
            <span>標案名稱：</span>
          </b-col>
          <b-col cols="4">
            <div v-if="isSave">
              <span>{{ currentTender.name }}</span>
            </div>
            <div v-else>
              <b-form-input
                v-model="currentTender.name"
              />
            </div>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="2">
            <span>標的分類：</span>
          </b-col>
          <b-col cols="4">
            <div v-if="isSave">
              <span>{{ currentTender.subjectProcurement }}</span>
            </div>
            <div v-else>
              <b-form-input
                v-model="currentTender.subjectProcurement"
              />
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TenderContent',
  computed: {
    ...mapState({
      currentTender: state => state.tender.current,
      currentFirm: state => state.firm.current,
      isSave: state => state.tender.isSave
    })
  },
  async mounted () {
    (!this.currentTender.name)
      ? this.setIsSave(false)
      : this.setIsSave(true)
  },
  methods: {
    ...mapMutations('tender', ['setIsSave'])
  }
}
</script>

<style>
.superiorEntity{
  margin-top: 10px;
}
</style>
