<template>
    <div class="profile">
        <nav-bar class="nav-bar">
            <div slot="conter">我的档案</div>
        </nav-bar>
        <login-bar></login-bar>
        <count-balance></count-balance>
        <normal-list-view :order-list="orderList" class="order-list"></normal-list-view>
        <normal-list-view :order-list="serviceList"></normal-list-view>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'

    import LoginBar from 'views/profile/profileCops/LoginBar'
    import CountBalance from 'views/profile/profileCops/CountBalance'
    import normalListView from 'views/profile/profileCops/normalListView'

export default {
    data(){
        return {
            orderList:[
                {icon:'message.svg',info:'我的消息'},
                {icon:'pointer.svg',info:'积分商城'},
                {icon:'vip.svg',info:'会员卡'}
            ],
            serviceList:[
                {icon:'cart.svg',info:'我的购物车'},
                {icon:'shopping.svg',info:'下载购物APP'}
            ]
        }
    },
    components:{
        NavBar,
        LoginBar,
        CountBalance,
        normalListView
    }
}
</script>
<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
    }
    .order-list {
        border-bottom: 15px solid #eee;
    }
</style>