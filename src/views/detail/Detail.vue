<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @themeTopClik="themeTopClik"
                    ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scrollClick="scrollClick"
            :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailGoods="detailGoods"
                         @imgLoad="imgLoad"></detail-goods-info>
      <detail-goods-params :goodsParam="goodsParam"
                           ref="params"></detail-goods-params>
      <detail-comment-info :commentInfo="commentInfo"
                           ref="comment"></detail-comment-info>
      <goods-list :goods="recommends"
                  ref="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick"
              v-show="isShowBack"></back-top>
    <detail-shop-cart :shoppingCartInfo="shoppingCartInfo"
                      ref="detailShop"
                      @addToCart="addToCart"></detail-shop-cart>>
    <detail-button-bar @showDetail="showDetail"></detail-button-bar>
  </div>
</template>
<script>
import DetailNavBar from './childCops/DetailNavBar'
import DetailSwiper from './childCops/DetailSwiper'
import DetailBaseInfo from './childCops/DetailBaseInfo'
import DetailShopInfo from './childCops/DetailShopInfo'
import DetailGoodsInfo from './childCops/DetailGoodsInfo'
import DetailGoodsParams from './childCops/DetailGoodsParams'
import DetailCommentInfo from './childCops/DetailCommentInfo'
import DetailButtonBar from './childCops/DetailButtonBar'
import DetailShopCart from './childCops/DetailShopCart'

import GoodsList from 'components/content/goods/GoodsList'

import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  recommend,
} from 'network/detail.js'

import scroll from 'components/common/scroll/Scroll'

import { debounce } from 'common/utils.js'
import { itemListener, BackTopMixins } from 'common/mixins'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
      shop: {},
      detailGoods: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      shoppingCartInfo: {},
    }
  },
  mixins: [itemListener, BackTopMixins],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    DetailButtonBar,
    DetailShopCart,
    scroll,
    GoodsList,
  },
  created() {
    // 获取从首页传过来的iid
    this.iid = this.$route.params.iid

    // 获取详情页的多条数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      // 1.保存topImages的数据
      this.topImages = data.itemInfo.topImages

      // 2.保存商品详细信息到goodsInfo中
      this.goodsInfo = new GoodsInfo(
        data.columns,
        data.itemInfo,
        data.shopInfo.services
      )

      // 3.保存店家详细信息到shopInfo中
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品详情保存到detailgoods中
      this.detailGoods = data.detailInfo

      // 5.保存商品的尺寸到goodsParam中
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )

      // 6.获取用户的评论数据到commentInfo中
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 7.获取推荐商品信息到recommends中
      recommend().then((res) => {
        this.recommends = res.data.list
      })
      //8.获取加入购物车信息
      this.shoppingCartInfo = data.skuInfo

      // 9.将detail切换进行防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
        // console.log(this.themeTopY);
      }, 100)
    })
  },
  methods: {
    ...mapActions(['addCart']),

    imgLoad() {
      this.refresh()

      this.$nextTick(() => {
        this.getThemeTopY()
      })
    },
    themeTopClik(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index])
    },
    scrollClick(opation) {
      const option = -opation.y

      let length = this.themeTopY.length
      for (let i = 0; i < length - 1; i++) {
        // 1.普通做法，不易理解
        /* if(this.currentIndex !== i && ((i<length-1 && option >= this.themeTopY[i] && option<this.themeTopY[i+1]) || (i===length-1 && option>=this.themeTopY[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        } */

        if (
          this.currentIndex !== i &&
          option >= this.themeTopY[i] &&
          option < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 显示或者隐藏backTop图标
      this.showBackTop(opation)
    },
    showDetail() {
      // 显示商品信息
      this.$refs.detailShop.isShow = true
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.$refs.detailShop.img
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.$refs.detailShop.handerPrice
      product.iid = this.iid
      product.style = this.$refs.detailShop.style
      product.size = this.$refs.detailShop.size
      product.count = this.$refs.detailShop.count
      // 2.把商品添加到购物车中
      this.addCart(product).then((res) => {
        this.$toast.show(res)
      })
      // 3.关闭商品详情
      this.$refs.detailShop.isShow = false
    },
  },
  mounted() {},
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemListner)
  },
}
</script>
<style scoped>
#detail {
  /* height: 100vh; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  background-color: #fff;
}
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 8;
}
.content {
  height: calc(100vh - 44px - 49px);
}
</style>