<template>
  <div>
    <b-overlay
      :show="show"
      variant="light"
      opacity="0.7"
    >
      <b-table
        :fields="fields"
        :items="list"
        sticky-header
        striped
      >
      </b-table>
    </b-overlay>
  </div>
</template>

<script>
import ethContract from '@/service/index.js'

export default {
  name: 'Dashboard',
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: '標案名稱',
          sortable: true,
          sortDirection: 'desc'
        }
      ],
      list: [],
      show: true
    }
  },
  async mounted () {
    const amount = await ethContract.methods
      .getCount()
      .call()
      .then(function (receipt) {
        return receipt
      })
    for (let i = 0; i < amount; i++) {
      const tender = await ethContract.methods
        .tenders(i)
        .call()
        .then(function (receipt) {
          return receipt
        })
      this.list.push(tender)
    }
    this.show = false
  }
}
</script>

<style>
</style>
