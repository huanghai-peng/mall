<template>
  <div class="detail-goods" v-if="Object.keys(detailGoods).length !==0">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailGoods.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-keys">
      {{detailGoods.detailImage[0].key}}
    </div>
    <div  class="info-list">
      <img :src="item" alt="" v-for="(item,index) in detailGoods.detailImage[0].list" :key="index" @load="imgLoad">
    </div>
  </div>
</template>
<script>
export default {
  props:{
    detailGoods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      this.$emit('imgLoad');
    }
  }
}
</script>
<style scoped>
  .detail-goods {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .start,
  .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .start {
    float: left;
  }
  .end {
    float: right;
  }
  .start::before,
  .end::after {
    content:'';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .end::after {
    right: 0;
  }
  .desc {
    padding: 10px 0;
    font-size: 13px;
  }
  .info-keys {
    padding: 10px 0;
    font-size: 14px;
    color: #333;
  }
  .info-list img{
    width: 100%;
  }
</style>