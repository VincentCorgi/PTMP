<template>
  <b-container fluid>
    <b-row class="vh-100" align-v="center">
      <b-col>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="2">
            <span>公司名稱</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="firm.name"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="2">
            <span>公司地址</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="firm.contactAddress"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="2">
            <span>聯絡人</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="firm.contact"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="2">
            <span>聯絡電話</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="firm.contactNumber"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  computed: {
    ...mapState({
      firm: state => state.firm.current
    })
  }
}
</script>

<style>

</style>
