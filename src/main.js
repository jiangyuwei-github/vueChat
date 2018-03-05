// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './common/stylus/index.styl'
import VueCookie from 'vue-cookie'
import fastclick from 'fastclick'
import layer from 'vue-layer-mobile'
// import VueLazyLoad from 'vue-lazyload'

// Vue.use(VueLazyLoad,{
// 	loading:require('common/image/default.png')
// })

Vue.config.productionTip = false

Vue.use(VueCookie);
Vue.use(layer);

fastclick.attach(document.body)

import { Lazyload } from 'mint-ui';
import $ from 'jquery'
Vue.use(Lazyload,{
    error: require('./common/images/errorImg.png'),
    loading: require('./common/images/loading.svg')
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})


