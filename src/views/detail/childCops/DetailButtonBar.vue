<template>
  <div class="detail-button-bar">
    <div class="detail-box">
      <div>
        <i class="icon server"></i>
        <div class="icon-text">客服</div>
      </div>
      <div>
        <i class="icon shop"></i>
        <div class="icon-text">店铺</div>
      </div>
      <div>
        <i class="icon select"></i>
        <div class="icon-text">收藏</div>
      </div>
    </div>
    <div class="detail-buy">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    addToCart(){
      this.$emit('addToCart');
    }
  }
}
</script>
<style scoped>
  .detail-button-bar {
    display: flex;
    height: 49px;
    background-color: pink;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .detail-button-bar>div {
    flex: 1;
  } 
  .detail-box {
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .detail-box>div {
    flex: 1;
  }
  .detail-buy {
    background-color: red;
  }
  .icon {
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png");
    background-size: 22px 150px;
    margin: 5px 0 3px 15px;
  }

  .icon-text {
    font-size: 13px;
  }
  .server {
    background-position: 0 -52px;
  }
  .shop {
    background-position: 0 -98px;
  }
  .detail-buy {
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    line-height: 49px;
    text-align: center;
  }
  .detail-buy>div {
    flex: 1;
  }
  .cart {
    background-color: #ffe817;
    color: #333;
  }
  .buy {
    background-color: #f69;
    
  }
</style>