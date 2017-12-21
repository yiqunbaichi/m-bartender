import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'
Vue.use(Router)
const routes = [
  {
    path: '/bartender',
    name: 'bartender',
    component: resolve => require(['../components/pages/terminal/Device.vue'], resolve)
  },
  {
    path: '/bartender/pages',
    name: 'pages',
    component: resolve => require(['../components/TabberMenu.vue'], resolve),
    children: [{
      name: 'detail',
      path: 'detail',
      component: resolve => require(['../components/pages/choice/GoodsDetail.vue'], resolve)
    }, {
      name: 'choice',
      path: 'choice',
      component: resolve => require(['../components/pages/choice/GoodsList.vue'], resolve)
    }, {
      path: 'sc',
      component: resolve => require(['../components/pages/sc/ShoppingCart.vue'], resolve)
    }, {
      path: 'mine',
      component: resolve => require(['../components/pages/mine/Mine.vue'], resolve)
    }

    ]
  }
]
if (window.localStorage.getItem('terminal')) {
  store.commit(types.TERMINAL, JSON.parse(window.localStorage.terminal))
}
const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes
})
export default router
