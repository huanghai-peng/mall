<template>
    <scroll class="tab-menu">
        <div class="tab-menu-list">
            <div class="tab-menu-item" v-for="(item,index) in categoryList" :key="index" 
            @click="currentClcik(index)"
            :class="{active:currentIndex===index}">
                {{item.title}}
            </div>
        </div>
    </scroll>
</template>

<script>
    import scroll from 'components/common/scroll/Scroll'
    export default {
        data(){
            return {
                currentIndex:0
            }
        },
        props:{
            categoryList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            currentClcik(index){
                this.currentIndex = index;
                this.$emit('currentClick',index);
            }
        },
        components:{
            scroll
        }
    }
</script>

<style scoped>
    .tab-menu {
        height: calc(100vh - 49px - 44px);
        overflow: hidden;
        width: 100px;
        box-sizing: border-box;
        
    }
    .tab-menu-list {
        height: 100%;
        background: #F6F6F6;
        font-size: 14px; 
    }
    .tab-menu-item {
        height: 45px;
        line-height: 45px;
        text-align: center;
        /* padding: 0 15px; */

    }
    .active {
        color: var(--color-high-text);
        background-color: #fff;
        border-left: 3px solid var(--color-high-text);
        font-weight: bold;
    }
</style>