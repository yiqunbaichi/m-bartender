import axios from 'axios'
import store from './store/store'
import * as types from './store/types'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://api.riowine.com:8070'
axios.defaults.baseURL = 'http://localhost:8781/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
      config.header('Access-Control-Allow-Origin', '*')
      config.header('Access-Control-Allow-Headers', 'X-Requested-With')
      config.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      config.header('X-Powered-By', '3.2.1')
      config.header('Content-Type', 'application/json;charset=utf-8')
    }

    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
