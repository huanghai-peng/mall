<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="conter">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-button-bar></cart-button-bar>
    </div>
</template>
<script>
    import navBar from 'components/common/navbar/NavBar'
    import cartList from './childCops/CartList'
    import CartButtonBar from 'views/cart/childCops/CartButtonBar'
    import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    components:{
        navBar,
        cartList,
        CartButtonBar
    },
    computed:{
        // 两种方法
        ...mapGetters(['cartLength'])
        // 第二种：可以改名
        /* ...mapGetters({
            length:'cartLength'
        }) */
    }
}
</script>
<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>