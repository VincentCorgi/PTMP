<template>
  <div>
    <div v-for="(item, index) in sidebarItems" :key="index">
      <b-button
        class="sidebarItems"
        :class="{
          choosedSB: selectedItem === item,
          notchoosedSB: selectedItem !== item,
        }"
        @click="chooseItem(item)"
      >{{item}}</b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      sidebarItems: [
        '招標查詢',
        '決標查詢'
      ]
      // selectedItem: '招標查詢'
    }
  },
  computed: {
    ...mapState({
      selectedItem: 'selectedItem'
    })
  },
  methods: {
    ...mapMutations(['setSelectedItem']),
    chooseItem (item) {
      // this.selectedItem = item
      this.setSelectedItem(item)
      const aaa = this.selectedItem === '招標查詢' ? 0 : 1
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
.sidebarItems {
  color: rgb(255, 255, 255) !important;
  background-color: #1d325f;
  border: none;
  margin-left: 0px;
  font-size: 16px;
  display: inline;
  position: relative;
  box-shadow: 0px;
  width: 100%;
  text-align: left;
  border-radius: 0px;
    font-weight: 600;
}
.choosedSB {
  color:  #192b51 !important;
 background-color: #ffffff;
  font-weight: 700;
  border-left: 15px solid #192b51 !important;
  border-radius: 50px 0px 0px 50px;
  font-size: 18px;

}
.notchoosedSB {
  color: rgb(255, 255, 255) !important;
}
.sidebarItems:hover {
 color:  #ffffff !important;
  background-color:#4673d497 !important;
  font-weight: 700;
  font-size: 18px;
}
</style>
