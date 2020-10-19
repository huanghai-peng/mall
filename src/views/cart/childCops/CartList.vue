<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cart" :key="index" :cart="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import scroll from 'components/common/scroll/Scroll'
import cartListItem from './CartListItem'

export default {
  computed:{
    ...mapGetters(['cart'])
  },
  components:{
    scroll,
    cartListItem
  },
  activated(){
      this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>