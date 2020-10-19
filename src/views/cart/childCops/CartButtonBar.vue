<template>
    <div class="cart-button-bar">
        <div class="check-all">
            <check-button class="check-button" :is-checked="isChecked" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            <span>合计:</span>
            <span>￥{{toTalPrice}}</span>
        </div>
        <div class="close" @click="closeClick">
            <span>结算({{closeCount}})</span>
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkbutton/CheckButton'
    import { mapGetters } from 'vuex'
    export default {
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cart']),
            // 1.汇总的价格
            toTalPrice(){
                return this.cart
                    .filter(item=>item.checked)
                    .reduce((privious,item)=>{
                        return privious + item.price * item.count;
                },0).toFixed(2)
            },
            // 2.汇总的个数
            closeCount(){
                return this.cart.filter(item => item.checked).length;
            },
            //3.是否全部选中
            isChecked(){
                if(this.cart.length===0) return false
                // 1.filter
                // return !this.cart.filter(item=> !item.checked).length

                // 2.find
                // return !this.cart.find(item=> !item.checked);
                
                // 3.遍历
                for(let item of this.cart){
                    if(!item.checked){
                        return false
                    }
                }
                return true;
            }
        },
        methods:{
            checkClick(){
                if(this.isChecked){
                    this.cart.forEach(item => item.checked = false)
                }else{
                    this.cart.forEach(item => item.checked = true)
                }
            },
            closeClick(){
                if(this.closeCount===0){
                    this.$toast.show('请选择商品');
                }
            }
        }
    }
</script>

<style scoped>
    .cart-button-bar {
        height: 40px;
        background-color: #eee;
        display: flex;
        font-size: 14px;
    }
    .check-all {
        display: flex;
        width: 60px;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .check-button {
        display: flex;
        margin-left: 10px;
        margin-right: 2px;
    }
    .price {
        flex: 1;
        text-align: center;
        line-height: 40px;
    }
    .price span:nth-child(2) {
        margin-left: 5px;
        color: var(--color-tint);
    }
    .close {
        width: 90px;
        background-color: var(--color-high-text);
        color: #fff;
        text-align: center;
        line-height: 40px;
    }
</style>