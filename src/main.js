// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from './http'
import store from './store/store'
import Vuex from 'vuex'
import AMap from 'vue-amap'
import App from './App.vue'

Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(AMap)

AMap.initAMapApiLoader({
  // 高德的key
  key: 'e688f6b4ffa2a2bb698d403e9015cf1c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation']
})
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
