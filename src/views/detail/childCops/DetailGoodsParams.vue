<template>
  <div class="params-info" v-if="Object.keys(goodsParam).length !== 0">
    <table v-for="(table,index) in goodsParam.sizes" :key="index" class="info-sizes">
      <tr v-for="(tr,indez) in table" :key="indez">
        <td v-for="(td,indey) in tr" :key="indey">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item,index) in goodsParam.infos" :key="index">
        <td class="info-param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParam.image.length !== 0">
      <img :src="goodsParam.image" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props:{
    goodsParam:{
      type:Object,
      detault(){
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .params-info {
    padding: 25px 8px;
    font-size: 12px;
    border-bottom: 5px solid #f2f5f8;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table tr {
    height: 42px;
  }
  table td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }
  .param-value {
    color: #EB4E6D;
  }
  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
  .info-param {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .info-img img {
    width: 100%;
  }
</style>