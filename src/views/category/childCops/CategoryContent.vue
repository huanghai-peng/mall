<template>
    <div v-if="Object.keys(subDetails).length !==0" class="category-content">
        <category-content-item v-for="(item,index) in subDetails" 
        :key="index" :sub-details-item="item" class="category-content-item">
        </category-content-item>
    </div>
</template>

<script>
    import CategoryContentItem from 'views/category/childCops/CategoryContentItem'
    export default {
        components:{
            CategoryContentItem
        },
        props:{
            subDetails:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .category-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;
        padding: 10px 8px;
    }
    .category-content-item {
        margin: 5px;
    }
</style>