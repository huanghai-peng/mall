<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!active">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // active:false,    
        }
    },
    props:{
        path:{
            type:String
        },
        activeColor:{
            type:String,
            default:"red"
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path);
        }
    },
    computed:{
        active(){
            // console.log(this.path);
            // console.log(this.$route.path);
            return this.$route.path.indexOf(this.path) != -1;
        },
        activeStyle(){
            return this.active ? {color:this.activeColor}:{}
        }
    }
}
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }
    .tab-bar-item img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-top: 3px;
        margin-bottom: 2px;
    }
</style>