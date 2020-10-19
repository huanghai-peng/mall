<template>
  <div class="cart-list-item">
        <div class="item-selector">
            <check-button :is-checked="cart.checked" @click.native="checkedClick"></check-button>
        </div>
    <div class="shop-image">
        <img :src="cart.image" alt="">
    </div>
    <div class="shop-detail">
        <div class="shop-detail-title">{{cart.title}}</div>
        <div class="shop-detail-desc">{{cart.desc}}</div>
        <div class="shop-msg">
            <div class="shop-price">￥{{cart.price}}</div>
            <div class="shop-count">x{{cart.count}}</div>
        </div>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
export default {
  props:{
    cart:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
      CheckButton
  },
  methods:{
      checkedClick(){
          this.cart.checked = !this.cart.checked
      }
  }
}
</script>
<style scoped>
.cart-list-item {
    display: flex;
    padding: 10px 5px;

    border-bottom: 1px solid #ccc;
}
.item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
.shop-image img{
    width: 70px;
    height: 90px;
    vertical-align: text-bottom;
    border-radius: 5px;
}

.shop-detail-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    width:200px;
}
.shop-detail-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    margin: 10px 0;
    font-size: 13px;
    width:200px;
}

.shop-count {
    float: right;
}
.shop-price {
    color: orangered;
    font-size: 15px;
    float: left;
}
.shop-detail {
   padding: 0 10px; 
   width: 100%;
}
</style>