<template>
    <div class="normal-list-view">
        <div class="list-info" v-for="(item,index) in orderList" :key="index">
            <div class="icon">
                <img :src="iconURL(item)" alt="">
            </div>
            <div class="list-info-msg">{{item.info}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            orderList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            iconURL(item){
                return require('assets/img/profile/'+item.icon)
            }
        }
    }
</script>

<style scoped>
    .normal-list-view div:last-child {
        border: 0;
    }
    .list-info {
        display: flex;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
    } 
    .icon {
        display: flex;
        align-items: center;
        margin-right: 5px;
    }
    .icon img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        
    }
    .list-info-msg {
        font-size: 16px;
    }
</style>