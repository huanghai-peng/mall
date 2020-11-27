<template>
  <div class="recommend">
    <div class="recommend-item"
         v-for="(item,i) in recommends"
         :key="i">
        <img :src="item.image"
             alt=""
             @load="recommendLoad">
        <div>{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        flag:false
    }
  },
  props: {
    recommends: {
      type: Array,
      default: [],
    },
  },
  methods: {
    recommendLoad() {
      if (!this.flag) {
        this.$emit('reImageLoad')
        this.flag = true
      }
    },
  },
}
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  border-bottom: 8px solid #eee;
  padding: 10px 0 20px;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 90%;
  margin-bottom: 10px;
}
</style>