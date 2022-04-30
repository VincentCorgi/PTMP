<template>
  <div>
    <div>
      <span>本標案名稱：</span>
      <input type="text" v-model="tender.name" />
    </div>
    <div>
      <span>採購標的為：</span>
    </div>
    <div>
      <span>本採購屬：</span>
    </div>
    <div>
      <span>本採購：</span>
    </div>
    <div>
      <span>本採購預算金額：</span>
    </div>
    <div>
      <span>本採購預計金額（不公告者免填）：</span>
    </div>
    <div>
      <span>上級機關名稱：</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTender',
  data () {
    return {
      tender: {
        name: ''
      }
    }
  }
}
</script>

<style>
</style>
