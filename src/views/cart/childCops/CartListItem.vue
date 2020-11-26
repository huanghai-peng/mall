<template>
  <div class="cart-list-item" >
        <div class="item-selector">
            <check-button :is-checked="cart.checked" @click.native="checkedClick"></check-button>
        </div>
    <div class="shop-image" @click="detailView(cart.iid)">
        <img :src="cart.image" alt="">
    </div>
    <div class="shop-detail">
        <div class="shop-detail-title" @click="detailView(cart.iid)">{{cart.title}}</div>
        <div class="shop-detail-desc">
            {{cart.style}};{{cart.size}} 
            <img src="~assets/img/common/down.png" alt="">
        </div>
        <div class="shop-msg">
            <div class="shop-price" @click="detailView(cart.iid)">￥{{cart.price}}</div>
            <div class="shop-count">
                <div class="btnsub" @click="handerSub(index)">-</div>
                <div class="count">{{cart.count}}</div>
                <div class="btnadd" @click="handerAdd(index)">+</div>
            </div>
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
    },
    index:{
        type:Number,
        default : 0
    }
  },
  components:{
      CheckButton
  },
  methods:{
      checkedClick(){
          this.cart.checked = !this.cart.checked
      },
    //   减少商品
      handerSub(){
          if(this.cart.count>1){
            this.$store.commit('sub',{index:this.index})
          }else{
              this.$toast.show('亲，不能再少了')
          }  
      },
    //   增加商品
      handerAdd(){
          this.$store.commit('add',{index:this.index})
      },
      detailView(iid){
        //   跳转到详情页
        this.$router.push('/detail/'+iid)
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
    text-align: center;
    margin: 10px 0;
    font-size: 12px;
    width: 100px;
    height: 20px;
    line-height: 20px;
    background-color: #F7F9F6;
    color: #ccc;
    padding: 1px 0;
}

.shop-detail-desc img {
    width: 10px;
    height: 10px;
}

.shop-count {
    float: right;
    display: flex;
    position: relative;
    top: 10px;
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
.btnsub {
    width: 30px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-right: 0;
    text-align: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.btnadd {
    width: 30px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-left: 0;
    text-align: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.shop-count .count {
    width: 30px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ccc;
    text-align: center;
}
</style>