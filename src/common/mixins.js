import { debounce } from 'common/utils.js'
import BackTop from 'components/content/backtop/BackTop'

export const itemListener = {
    data() {
        return {
            itemListner: null,
            refresh: null
        }
    },
    mounted() {
        // 1.图片加载完成后做的事件监听
        this.refresh = debounce(this.$refs.scroll.refresh, 100);
        this.itemListner = () => {
            this.refresh();
        }
        this.$bus.$on('itemImgLoad', this.itemListner)
    }
}

export const BackTopMixins = {
    data() {
        return {
            isShowBack: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        showBackTop(option) {
            // 1.显示和隐藏isShowBack图标
            this.isShowBack = -option.y > 1000
        }
    }
}