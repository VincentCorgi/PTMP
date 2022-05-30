<template>
  <div>
    <b-overlay
      :show="show"
      variant="light"
      opacity="0.7"
    >
      <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="info" :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-table
        :fields="fields"
        :items="list"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        striped
      >
        <template #cell(name)="row">
          <router-link
            :to="{}"
            @click.native="pushTo(row.item)"
          >
            {{ row.value }}
          </router-link>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
        first-number
        last-number
      ></b-pagination>
    </b-overlay>
  </div>
</template>

<script>
import { ethContract } from '@/service/index.js'

export default {
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
      currentPage: 1,
      perPage: 10,
      filter: null,
      show: true
    }
  },
  computed: {
    totalRows () {
      return this.list.length
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
  },
  methods: {
    pushTo (data) {
      this.$store.commit('tender/setTender', data)
      this.$router.push({
        name: 'TenderContent'
      })
    }
  }
}
</script>

<style>

</style>
