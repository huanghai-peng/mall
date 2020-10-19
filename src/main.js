import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300延迟问题
fastClick.attach(document.body)

// 图片懒加载
Vue.use(vueLazyLoad, {
    loading: require('assets/img/common/placeholder.jpg')
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')