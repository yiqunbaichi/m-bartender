// http.js
var axios = require('axios')
var env = require('./config/env.js')

// 设置请求baseURL
// axios.defaults.baseURL = 'http://api.riowine.com:8070'
// axios.defaults.baseURL = 'http://rio.lanever.com:8096'
axios.defaults.baseURL = env.ws_wxapp_baseURL

// 设置默认请求头
axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data'
  'Content-Type': 'application/x-www-form-urlencoded'

}
// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]
// 带cookie请求
axios.defaults.withCredentials = true

module.exports = axios
