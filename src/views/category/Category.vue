<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="conter">商品分类</div>
        </nav-bar>
        <tab-control :title="['综合','新品','销量']" @tabClick="tabClick" class="tabControl" 
        v-show="showTabContrl" ref="tabControl1">
        </tab-control>
        <div class="content">
            <tab-menu :category-list="categoryList" @currentClick="currentClick"></tab-menu>
            <scroll class="category" ref="scroll" :probe-type="3" 
            :pull-up-load="true" @scrollClick="scrollClick">
                <category-content :sub-details="showSubcategory"></category-content>
                <tab-control :title="['综合','新品','销量']" @tabClick="tabClick" ref="tabControl2"></tab-control>
                <goods-list :goods="showCategoryDetail" ></goods-list>
            </scroll>
            <back-top v-if="isShowBack" @click.native="backClick"></back-top>
        </div>   
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'

    import TabMenu from 'views/category/childCops/TabMenu'
    import CategoryContent from 'views/category/childCops/CategoryContent'

    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backtop/BackTop'
    

    import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'

    import {itemListener,BackTopMixins} from 'common/mixins'
export default {
    data(){
        return {
            categoryList:null,
            categoryData:{},
            tabTypeIndex:'pop',
            currentIndex:-1,
            saveY:0,
            showTabContrl:false,
            offsetTop:0
        }
    },
    mixins:[itemListener,BackTopMixins],
    components:{
        NavBar,
        TabMenu,
        CategoryContent,
        Scroll,
        TabControl,
        GoodsList,
        BackTop
    },
    methods:{
        /**
         * 下面是category的方法
         */
        scrollClick(option){
            // 控制显示隐藏backtop图标
            this.showBackTop(option);

            // 控制tabcontrol1的显示和隐藏
            this.showTabContrl = -option.y >  this.offsetTop
        },
        ItemImg(){
            // 保存tabcontrol的高度
            this.offsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        /**
         * 下面是网络请求的方法
         */
        // 1.定义获取菜单栏的数据方法
        getCategory1(){
            getCategory().then(res=>{
                this.categoryList = res.data.category.list;
                // 2.为每个切换栏分别保存数据
                for(let i=0;i<this.categoryList.length;i++){
                    this.categoryData[i]={
                        subDetails: [],
                        categoryDetail: {
                            'pop': [],
                            'new': [],
                            'sell': []
                        }
                    }
                }

                // 初始化切换栏的第一个数据内容
                this.getSubcategory1(0);
                
            });
        },
        // 2.定义切换栏数据的内容
        getSubcategory1(index){
            this.currentIndex = index;
            const maitKey = this.categoryList[this.currentIndex].maitKey;
            getSubcategory(maitKey).then(res=>{
                this.categoryData[this.currentIndex].subDetails = res.data.list;
                this.categoryData={...this.categoryData};

                // 初始化切换栏内容的第一个商品数据
                this.getCategoryDetail1('pop')
                this.getCategoryDetail1('new')
                this.getCategoryDetail1('sell')
            })  
        },
        // 3.定义切换栏数据的商品内容
        getCategoryDetail1(type){
            const miniWallkey = this.categoryList[this.currentIndex].miniWallkey;
            getCategoryDetail(miniWallkey,type).then(res=>{
                this.categoryData[this.currentIndex].categoryDetail[type]=res;
                this.categoryData={...this.categoryData}
            })
        },
        currentClick(index){
            this.getSubcategory1(index);
            // 每次切换菜单时，让页面滚动回最前，让showTabContrl隐藏
            this.$refs.scroll.scrollTo(0,0,0);
            this.showTabContrl=false
            this.$refs.tabControl1.currentIndex = 0;
            this.$refs.tabControl2.currentIndex = 0;
            this.$refs.scroll.refresh();
        },
        tabClick(index){
            switch (index) {
                case 0:
                //如果当前页面不是正在显示的就滚动到所点击标签的起始位置
                if (this.tabTypeIndex != 'pop' && this.showTabContrl) {
                    this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.offsetTop), 0);
                }
                this.tabTypeIndex= 'pop';
                break;

                case 1:
                if (this.tabTypeIndex != 'new' && this.showTabContrl) {
                    this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.offsetTop), 0);
                }
                this.tabTypeIndex = 'new';
                break;

                case 2:
                if (this.tabTypeIndex != 'sell' && this.showTabContrl) {
                    this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.offsetTop), 0);
                }
                this.tabTypeIndex = 'sell';
                break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;    
        }
    },
    created(){
        // 1.获取Category菜单列表数据
        this.getCategory1()


    },
    computed:{
        showSubcategory(){
            if(this.currentIndex ==-1){
                return []
            }
            return this.categoryData[this.currentIndex].subDetails
        },
        showCategoryDetail(){
            if(this.currentIndex ==-1){
                return []
            }
            return this.categoryData[this.currentIndex].categoryDetail[this.tabTypeIndex]
        }
    },
    mounted(){
        // 监听tabcontrol上面的图片是否加载完成
        this.$bus.$on('categoryItemImg',this.ItemImg)
    },
    activated(){
        // 回到之前离开页面时的位置
        this.$refs.scroll.scrollTo(0,this.saveY);
        this.$refs.scroll.refresh();
    },
    deactivated(){
        // 保存离开分类页面时的位置
        this.saveY = this.$refs.scroll.getScrollY()
    }
}
</script>
<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        position: relative;
    }
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        display: flex;
    }
    .category {
        flex: 1;
        overflow: hidden;
    }
    .tabControl {
        position: absolute;
        width: calc(100% - 100px);
        right: 0;
        z-index: 8;
    }
</style>