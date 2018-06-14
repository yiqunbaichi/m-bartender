var express = require('express')
var app = express()
// var fs = require('fs')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var server = app.listen(8782, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

app.set('superSecret', 'm-bartender') // 设置app 的超级密码--用来生成摘要的密码

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') res.send(200)
  else next()
})

app.use(function (req, res, next) {
  var url = req.originalUrl
  // console.log(url);

    if (url =='' && !req.session.user) {
    return res.send(rm.getErrorVerify())
  }
  next();
})

let mbTerminal = require('./router/mbartender/terminal-api')
let mbGoods = require('./router/mbartender/goods-api')
app.use('/ws/mbartender/terminalApi', mbTerminal)
app.use('/ws/mbartender/goodsApi', mbGoods)

let wxappGoods = require('./router/wxapp/goods-api')
let wxappTrade = require('./router/wxapp/trade-api')
let wxappMine = require('./router/wxapp/mine-api')
let wxappSecurity = require('./router/wxapp/security-api')
let wxappDIY = require('./router/wxapp/DIY-api')
let wxappFace = require('./router/wxapp/face-api')
let tradeQueue = require('./router/wxapp/tradeQueue-api')


app.use('/ws/wxapp/goodsApi', wxappGoods)
app.use('/ws/wxapp/tradeApi', wxappTrade)
app.use('/ws/wxapp/mineApi', wxappMine)
app.use('/ws/wxapp/securityApi', wxappSecurity)
app.use('/ws/wxapp/DIYApi', wxappDIY)
app.use('/ws/wxapp/faceApi', wxappFace)
app.use('/ws/wxapp/tradeQueueApi', tradeQueue)



let qrcodejump = require('./router/wxapp/wx/qrcodejump')
app.use('/riofresh/qrcodejump', qrcodejump)


