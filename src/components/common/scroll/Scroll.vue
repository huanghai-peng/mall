<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
export default {
  data(){
    return {
      bscroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.bscroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    this.bscroll.on('scroll',(option)=>{
      this.$emit('scrollClick',option);
    })

    this.bscroll.on('pullingUp',()=>{
      this.$emit('pullingUp');
    })
  },
  methods:{
    scrollTo(x,y,time=500){
      this.bscroll && this.bscroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.bscroll.finishPullUp();
    },
    refresh(){
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY(){
      return this.bscroll ? this.bscroll.y:0
    }
  }
}
</script>
<style scoped>

</style>