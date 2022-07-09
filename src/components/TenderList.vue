<template>
  <div>
    <b-overlay
      :show="show"
      variant="light"
      opacity="0.7"
    >
    <div style="margin: 10px 200px 10px 300px;">
      <b-form-group
        label="篩選關鍵字"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="center"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="輸入標案名稱"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="info" :disabled="!filter" @click="filter = ''" style="margin-right: 100px">清除</b-button>
            <b-button variant="outline-primary" style="float: right; margin-right: 10px;" @click="addTender">新增招標</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div style="margin: 10px 50px 0px 50px">
      <b-table
        :thead-class="{
          invitation_thead: selectedItem === '招標查詢',
          award_thead: selectedItem === '決標查詢'
        }"
        :fields="fields"
        :items="tenderList"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        striped
      >
        <template #cell(superiorEntity)="row">
          <span>{{ row.item.tenderer.name }}</span>
        </template>
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
    </div>
    </b-overlay>
  </div>
</template>

<script>
import { ethContract } from '@/service/index.js'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      fields: [
        {
          key: 'superiorEntity',
          label: '機關名稱',
          sortable: true
        },
        {
          key: 'name',
          label: '標案名稱',
          sortable: true
        },
        {
          key: 'tenderMethod',
          label: '招標方式',
          sortable: true
        },
        {
          key: 'procurementProperty',
          label: '採購性質',
          sortable: true
        },
        {
          key: 'publishingDate',
          label: '公告日期',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'biddingDeadline',
          label: '截止日期',
          sortable: true
        },
        {
          key: 'budgetAmount',
          label: '預算金額',
          sortable: true
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
    ...mapState({
      selectedItem: 'selectedItem',
      tenderList: state => state.tender.tenderList
    }),
    totalRows () {
      return this.tenderList.length
    }
  },
  async mounted () {
    // const amount = await ethContract.methods
    //   .getCount()
    //   .call()
    //   .then(function (receipt) {
    //     return receipt
    //   })
    // // amount可以在solidity裏面寫，並用拿取list可以優化至vuex
    // for (let i = 0; i < amount; i++) {
    //   const tender = await ethContract.methods
    //     .tenders(i)
    //     .call()
    //     .then(function (receipt) {
    //       return receipt
    //     })
    //   this.list.push(tender)
    // }
    this.show = false
  },
  methods: {
    ...mapMutations('tender', ['setTender']),
    pushTo (data) {
      this.$store.commit('tender/setTender', data)
      this.$router.push({
        name: 'TenderContent'
      })
    },
    async addTender () {
      const current = new Date()
      const today = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
      const init = {
        addr: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0], // 待抓當前
        name: '',
        tenderMethod: '公開招標', // 招標方式
        procurementProperty: '', // 採購性質
        publishingDate: today, // 公告日
        budgetAmount: '', // 預算金額
        biddingDeadline: '', // 截止投標
        openingDate: '', // 公告日期
        status: 0
      }
      this.setTender(init)
      this.$router.push({ name: 'AddTender' })
    }
  }
}
</script>

<style>
.invitation_thead{
  background-color: #ecaa68;
  color: white;
}
.award_thead{
  background-color: #2587f0;
  color: white;
}
</style>
