<template>
  <b-container fluid>
    <b-row class="vh-100" align-v="center">
          <b-overlay
      :show="show"
      variant="light"
      opacity="0.7"
    >
      <b-col>
        <div class="register">
        <b-row align-h="center" style="margin-top: 30px">
          <b-col cols="3">
            <span style="color: red">*</span><span style="font-size: 18px; font-weight: bold;">公司名稱：</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="currentFirm.name"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="3">
            <span style="color: red">*</span><span style="font-size: 18px; font-weight: bold;">公司地址：</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="currentFirm.contactAddress"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="3">
            <span style="color: red">*</span><span style="font-size: 18px; font-weight: bold;">聯絡人：</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="currentFirm.contact"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="3">
            <span style="color: red">*</span><span style="font-size: 18px; font-weight: bold;">聯絡電話：</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="currentFirm.contactNumber"/>
          </b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 12px">
          <b-col cols="3">
            <span style="color: red">*</span><span style="font-size: 18px; font-weight: bold;">電子郵件：</span>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="currentFirm.email"/>
          </b-col>
        </b-row>
        </div>
        <b-row>
          <b-col>
            <b-button variant="success" style="margin: 100px 0px 0px 700px;" @click= "registerFirm">確認</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-overlay>

    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      currentFirm: state => state.firm.current
    })
  },
  mounted () {
    this.show = false
  },
  methods: {
    ...mapActions('firm', ['addFirm']),
    async registerFirm () {
      this.show = true
      await this.addFirm()
      this.show = false
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style>
.register{
  height: 300px;
  width: 700px;
  margin: 0px 0px 0px 200px;
  border-style: solid;
  border-width: 3px;
  border-color:cadetblue;
}
</style>
