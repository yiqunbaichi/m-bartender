// http.js
var axios = require('axios')

// 设置请求baseURL
axios.defaults.baseURL = 'http://api.riowine.com:8070'
// 设置默认请求头
axios.defaults.headers = {
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
