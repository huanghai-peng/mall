<template>
  <swiper>
      <swiper-item v-for="(item,i) in banner" :key="i">
          <a :href="item.link">
              <img :src="item.image" alt="" @load="imgLoad">
          </a>
      </swiper-item>
  </swiper>
</template>
<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/Swiper.js'
export default {
  data(){
    return{
      isImgLoad:false
    }
  },
  components:{
    Swiper,SwiperItem
  },
  props:{
    banner:{
      type:Array,
      default:[]
    } 
  },
  methods:{
    imgLoad(){
      if(!this.isImgLoad){
        this.$emit('swiperImgLoad');
        this.isImgLoad = true;
      } 
    }
  }
  
}
</script>
<style scoped>

</style>