<template>
    <div>
      <b-form-datepicker v-model="date"></b-form-datepicker>
      <b-form-timepicker @context="onContext"></b-form-timepicker>
      <b-button @click="test">click</b-button>
      {{dateString}}
    </div>
</template>

<script>
export default {
  name: 'Vincent',
  data () {
    return {
      date: '',
      time: '',
      dateString: '',
      context: ''
    }
  },
  methods: {
    test () {
      const date = new Date()
      const time = this.addHours()
      console.log(time.getMinutes(), time.getHours())
    },
    addHours () {
      const date = new Date(this.date)
      date.setHours(date.getHours() + this.context.hours - 8)

      return date
    },
    onContext (ctx) {
      this.context = ctx
    }
  }
}
</script>

<style>

</style>
