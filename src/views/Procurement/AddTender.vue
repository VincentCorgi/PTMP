<template>
  <div>
    <div>
      <span>本標案名稱：</span>
      <input type="text" v-model="tender.name" />
    </div>
    <div>
      <span>採購標的為：</span>
      <!-- 工程、財務、勞務 -->
      <input type="text" v-model="tender.subjectProcurement" />
    </div>
    <div>
      <span>本採購屬：</span>
      <!-- 公告金額十分之一以下之採購
      逾公告金額十分之一未達公告金額之採購
      公告金額以上未達查核金額之採購
      查核金額以上未達巨額之採購
      巨額採購 -->
    </div>
    <div>
      <span>本採購：</span>
      <!-- 為共同供應契約
      非共同供應契約 -->
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
    <div>git test PTMP branch</div>
    <div>git test PTMP branch test2</div>
  </div>
</template>

<script>
export default {
  name: 'AddTender',
  data () {
    return {
      tender: {
        name: '',
        subjectProcurement: ''
      }
    }
  }
}
</script>

<style>
</style>
