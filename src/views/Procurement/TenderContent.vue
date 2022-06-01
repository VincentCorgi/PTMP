<template>
  <b-container fluid>
    <b-row class="vh-100" align-v="center">
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

</style>
