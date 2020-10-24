<template>
  <div class="goods-list">
    <goods-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-item>
  </div>
</template>
<script>
  import GoodsItem from 'components/content/goods/GoodsItem'
export default {
  components:{
    GoodsItem
  },
  props:{
    goods:{
      type:Array,
      default(){
          return []
      }
    }
  }
}
</script>
<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>