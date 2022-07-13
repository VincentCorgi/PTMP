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
            <b-button
              variant="info"
              :disabled="!filter"
              @click="filter = ''"
              style="margin-right: 100px"
            >清除</b-button>
            <b-button
              variant="primary"
              style="float: right; margin-left: 50px; border-radius: 5px;"
              size="lg"
              v-show="selectedItem === '招標查詢'"
              @click="addTender"
            >新增招標</b-button>
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
        :fields="selectedItem === '招標查詢' ? invitation_fields : award_fields"
        :items="tenderList"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        striped
      >
        <template #cell(superiorEntity)="row">
          <span>{{ row.item.tenderer.name }}</span>
        </template>
        <template #cell(items)="row">
          {{ `${row.index +1}` }}
        </template>
        <template #cell(name)="row">
          <router-link
            :to="{}"
            @click.native="pushTo(row.item)"
          >
            {{ row.value }}
          </router-link>
        </template>
        <template #cell(tenderMethod)="row">
          <span v-show="row.value === '0'">公開招標</span>
          <span v-show="row.value === '1'">選擇性招標</span>
          <span v-show="row.value === '2'">限制性招標</span>
        </template>
        <template #cell(procurementProperty)="row">
          <span v-show="row.value === '0'">工程類</span>
          <span v-show="row.value === '1'">財務類</span>
          <span v-show="row.value === '2'">勞務類</span>
        </template>
        <template #cell(budgetAmount)="row">
          {{ row.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
        </template>
        <template #cell(awardAmount)="row">
          {{ row.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
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
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      invitation_fields: [
        {
          key: 'items',
          label: '項次',
          sortable: true
        },
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
      award_fields: [
        {
          key: 'items',
          label: '項次',
          sortable: true
        },
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
          key: 'awardAmount',
          label: '決標金額',
          sortable: true
        }
      ],
      list: [],
      currentPage: 1,
      filter: null,
      show: true,
      perPage: 10
    }
  },
  computed: {
    ...mapState({
      selectedItem: 'selectedItem'
    }),
    ...mapGetters('tender', ['tenderList']),
    totalRows () {
      return this.tenderList.length
    }
  },
  async mounted () {
    await this.lookupTenderList()
    this.show = false
  },
  methods: {
    ...mapActions('tender', ['lookupTenderList']),
    async pushTo (data) {
      this.$store.commit('tender/setTender', data)
      this.selectedItem === '招標查詢'
        ? this.$router.push({ name: 'TenderContent' })
        : this.$router.push({ name: 'AwardTender' })
    },
    async addTender () {
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
