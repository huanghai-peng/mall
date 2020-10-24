<template>
    <div v-if="Object.keys(subDetailsItem).length !==0" class="category-content-item">
        <div class="item-img"><img :src="subDetailsItem.image" alt="" @load="categoryItemImg"></div>
        <div>{{subDetailsItem.title}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            subDetailsItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            categoryItemImg(){
                this.$bus.$emit('categoryItemImg')
            }
        }
    }
</script>

<style scoped>
    .category-content-item {
        text-align: center;
        font-size: 12px;
    }
    .item-img {
        width: 60px;
        height: 60px;

    }
    .item-img img {
        width: 100%;
        
    }
</style>