<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in title" :key="index" :class="{active:index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    title:{
      type:Array,
      default:[]
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index);
    }
  }
}
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color:var(--color-high-text);
    
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
    
  }
</style>