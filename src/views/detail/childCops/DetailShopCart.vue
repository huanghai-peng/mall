<template>
  <div class="detail-shop-cart"
       v-if="isShow">
    <div class="container">
      <div class="message">
        <img v-lazy="showImg"
             alt="">
        <div class="detail-msg">
          <div class="price">{{currency}}{{handerPrice}}</div>
          <div class="repertory">库存{{stock}}件</div>
          <div class="selected">已选择：<span>"{{style}}" "{{size}}"</span></div>
        </div>
        <div class="close"
             @click="closeClick">X</div>
      </div>

      <scroll class="scroll">
          <div class="colour-info">
            <div>{{shoppingCartInfo.props && shoppingCartInfo.props[0].label}}</div>
            <div class="colour-list">
              <div class="colour-item"
                   v-for="(item,index) in shoppingCartInfo.props[0].list"
                   :key="index"
                   :class="{active:currentIndex1==index}"
                   @click="colourClick(index,item)">{{item.name}}</div>
            </div>
            <div>{{shoppingCartInfo.props[1].label}}</div>
            <div class="colour-list">
              <div class="colour-item"
                   v-for="(item,index) in shoppingCartInfo.props[1].list"
                   :key="index"
                   :class="{active:currentIndex2==index}"
                   @click="sizeClick(index,item.name)">{{item.name}}</div>
            </div>
          </div>

          <div class="shop">
            <div class="count">数量:</div>
            <div class="shop-count">
              <div class="btnsub"
                   @click="handerSub">-</div>
              <div class="count">{{count}}</div>
              <div class="btnadd"
                   @click="handerAdd">+</div>
            </div>
          </div>
          <div class="wire"></div>
      </scroll>

      <div class="confirm"
           @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/Scroll'
export default {
  data() {
    return {
      isShow: false,
      styleId: 1,
      nowprice: 0,
      stock: 0,
      style: '',
      currency: '',
      size: '',
      currentIndex1: 0,
      currentIndex2: 0,
      count: 1,
      img: '',
    }
  },
  props: {
    shoppingCartInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  components: {
    scroll,
  },
  methods: {
    //减少商品
    handerSub() {
      if (this.count > 1) {
        this.count--
      } else {
        this.$toast.show('亲，不能再少了')
      }
    },
    //增加商品
    handerAdd() {
      this.count++
    },
    detailView(iid) {
      //跳转到详情页
      this.$router.push('/detail/' + iid)
    },
    //关闭购物车
    closeClick() {
      this.isShow = false
    },
    //颜色切换
    colourClick(index, item) {
      this.currentIndex1 = index
      this.style = item.name
      this.styleId = item.styleId
    },
    //尺码切换
    sizeClick(index, name) {
      this.currentIndex2 = index
      this.size = name
    },
    // 添加到购物车
    confirm() {
      this.$emit('addToCart')
    },
  },
  computed: {
    //处理显示图片
    showImg() {
      if (this.shoppingCartInfo.skus != undefined) {
        for (let product of this.shoppingCartInfo.skus) {
          if (product.styleId == this.styleId) {
            this.nowprice = product.nowprice
            this.stock = product.stock
            this.style = product.style
            this.currency = product.currency
            this.size = product.size
            this.img = product.img
            return product.img
          }
        }
      }
    },
    //处理单价
    handerPrice() {
      const price = this.nowprice.toString()
      const beforePrice = price.substr(0, price.length - 2)
      const endPrice = price.substr(price.length - 2)
      return `${beforePrice}.${endPrice}`
    },
  },
}
</script>

<style scoped>
.detail-shop-cart {
  position: fixed;
  top: 44px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60vh;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  animation: showShopCart 0.7s ease-out;
  z-index: 999;
}
@keyframes showShopCart {
  0% {
    height: 0;
  }
  100% {
    height: 60vh;
  }
}
.message {
  position: relative;
  display: flex;
  height: 105px;
}
.message img {
  position: relative;
  top: -30px;
  left: 15px;
  width: 80px;
  height: 109px;
}
.detail-msg {
  margin-left: 30px;
  margin-top: 10px;
  font-size: 12px;
}
.detail-msg .price {
  font-size: 20px;
  color: var(--color-high-text);
}
.repertory {
  margin: 5px 0;
}
.selected span {
  color: var(--color-high-text);
}
.close {
  position: absolute;
  width: 20px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  line-height: 19px;
  border-radius: 50%;
  border: 1px solid #ccc;
  top: 6px;
  right: 8px;
}
.scroll {
    height: calc(60vh - 105px - 40px);
    overflow: hidden;
}
.colour-info {
  font-size: 12px;
  margin: 0 10px;
}
.colour-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-top: 8px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.colour-item {
  margin-right: 20px;
  padding: 2px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.shop {
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
  font-size: 12px;
}
.shop-count {
  display: flex;
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
.wire {
  width: 345px;
  height: 1px;
  margin: 0 10px 0 20px;
  background-color: #eee;
}
.confirm {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background-color: var(--color-high-text);
}
.active {
  color: var(--color-high-text);
  border-color: var(--color-high-text);
}
</style>