<template>
    <div>
        <tab-bar>
            <tab-bar-item path="/home">
                <img src="~assets/img/tabbar/icon01.png" slot="item-icon" alt="">
                <img src="~assets/img/tabbar/icon01_active.png" slot="item-icon-active" alt="">
                <div slot="item-text">首页</div>
            </tab-bar-item>
            <tab-bar-item path="/category" >
                <img src="~assets/img/tabbar/icon02.png" slot="item-icon" alt="">
                <img src="~assets/img/tabbar/icon02_active.png" slot="item-icon-active" alt="">
                <div slot="item-text">分类</div>
            </tab-bar-item>
            <tab-bar-item path="/cart" >
                <img src="~assets/img/tabbar/icon03.png" slot="item-icon" alt="">
                <img src="~assets/img/tabbar/icon03_active.png" slot="item-icon-active" alt="">
                <div slot="item-text">购物车</div>
            </tab-bar-item>
            <tab-bar-item path="/profile">
                <img src="~assets/img/tabbar/icon04.png" slot="item-icon" alt="">
                <img src="~assets/img/tabbar/icon04_active.png" slot="item-icon-active" alt="">
                <div slot="item-text">我的</div>
            </tab-bar-item>
    </tab-bar>
    </div>
</template>
<script>
  import TabBar from 'components/common/tabbar/TabBar';
  import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
    components:{
        TabBar,
        TabBarItem
    }
}
</script>
<style scoped>

</style>