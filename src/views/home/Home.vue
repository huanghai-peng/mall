<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="conter" >购物街</div>
        </nav-bar>
        <tab-control  :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tabControl" v-show="showTabControl"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scrollClick="scrollClick" :pull-up-load="true" @pullingUp="loadMove">
            <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
            <recommend :recommends="recommends" @reImageLoad="reImageLoad"></recommend>
            <feature-view ></feature-view>
            <tab-control  :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" ></tab-control>
            <goods-list :goods="showGoods"></goods-list>
            <div class="refreshMsg" v-show="isShowBack">上拉加载更多</div>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBack"></back-top>
    </div>
</template>
<script>
    import HomeSwiper from './childCops/homeSwiper'
    import Recommend from './childCops/Recommend'
    import FeatureView from './childCops/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'

    import {homeMutildata,homeGoods} from 'network/home.js'

    import {debounce} from 'common/utils.js'
    import {itemListener,BackTopMixins} from 'common/mixins'
export default {
    data(){
        return {
            banner:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            tabOffsetTop:630,
            showTabControl:false,
            saveY:0,
            reImageLoad1:false
        }
    },
    mixins:[itemListener,BackTopMixins],
    components:{
        HomeSwiper,
        Recommend,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll
    },
    created(){
        // 1.请求多个数据
        this.homeMutildata()
        // 2.请求商品数据
        this.homeGoods('pop')
        this.homeGoods('new')
        this.homeGoods('sell')
    },
    mounted(){
    },
    destroyed(){
        console.log('home destroyed');
    },
    activated(){
        // 回到首页时，将保存页面滑动到之前离开时的位置
        this.$refs.scroll && this.$refs.scroll.scrollTo(0,this.saveY,0);

        this.$refs.scroll && this.$refs.scroll.refresh();
    },
    deactivated(){
        
        // 1.离开首页时，保存当前saveY的位置
        this.saveY = this.$refs.scroll.getScrollY();

        // 离开首页时，取消图片监听
        // this.$bus.$off('itemImgLoad',this.itemListner);
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        /**
         * 下面是home的方法
         */
        tabClick(index){
            switch (index){
                case 0:
                    this.currentType='pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        scrollClick(option){
            // 1.显示和隐藏isShowBack图标
            this.showBackTop(option);

            // 2.显示和隐藏tabControl
            this.showTabControl = -option.y > this.tabOffsetTop
        },
        loadMove(){
            this.homeGoods(this.currentType);
        },
        reImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop; 
        },
        swiperImgLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop; 
        },
        /**
         * 下面是网络请求的代码
         */
        homeMutildata(){
            homeMutildata().then(
                res=>{
                    this.banner=res.data.banner.list;
                    this.recommends=res.data.recommend.list;
                }
            );
        },
        homeGoods(type){
            let page=this.goods[type].page+1;
            homeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1
                this.$refs.scroll.finishPullUp();
            })
        }
    }
}
</script>
<style scoped>
    #home {
        position: relative;
        /* margin-top: 44px; */
        height: 100vh;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0; */
        /* z-index: 8; */
    }

    /* 第一种方法：利用calc方法计算 */
    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
    } */
    /* 第二种方法：利用定位 */
    .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px;

        /* height: 330px; */
        overflow: hidden;
    }

    .tabControl {
        position: relative;
        z-index: 8;
    }

    .refreshMsg {
        position: absolute;
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-style: oblique;
        color: rgba(0, 0, 0, .5);
    }
</style>