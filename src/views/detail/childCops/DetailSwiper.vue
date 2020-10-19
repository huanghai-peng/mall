<template>
  <swiper class="swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper/Swiper.js'
export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .swiper {
    height: 300px;
    overflow: hidden;
  }
</style>