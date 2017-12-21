var redisdb = require('../../config/redis')
var express = require('express')
var router = express.Router()
var rm = require('../../config/resultMessage')
var ws_b_config = require('../../config/wsBartenderConfig')

  // router.get('/getUserInfo', function(req, res, next) {
  //
  //
  //   redisdb.get('tb_order_by_member:73ea28fd35fc33fdaea67ca2b9885a48', function(err,result){
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(result);
  //   res.send(result);
  // })
  // });

router.get('/ttt', function (req, res, next) {
  // redisdb.geoadd(ws_b_config.tb_bartender_poslist, '120.10782', '30.298348', '10001', function (err, result) {
  // })
  res.send(rm.getSuccessRM('', '0'))

  // let v = {
  //   terminalId: '10001',
  //   name: '第二台home版',
  //   imageUrl: 'http://api.riowine.com:8070/brp/photo/robot/product/R019/1508838552987.png',
  //   address: '康桥东路538号 2楼',
  //   tel: '0571-198771'
  // }
  // redisdb.set(ws_b_config.tb_bartender_detail + '10001', JSON.stringify(v), 0, function (err, result) {
  //   if (!err) {
  //     res.send(rm.getRM(200, 'success', result))
  //   }
  // })

  // redisdb.get(ws_b_config.bartnder_list + terminalId, function (result) {
  //   res.send(rm.getRM(200, 'success', result))
  // })
})
router.get('/terminalInfo', function (req, res, next) {
  let terminalId = req.query.terminalId
  let longitude = req.query.longitude
  let latitude = req.query.latitude
  if (!isNaN(terminalId)) { // 查询对应的终端
    redisdb.get(ws_b_config.tb_bartender_detail + terminalId, function (err, result) {
      res.send(rm.getSuccessRM('', result))
    })
  } else if (!isNaN(longitude) && !isNaN(latitude)) { // 查询附近终端
    redisdb.georadius(ws_b_config.tb_bartender_poslist, longitude, latitude, 5, 'km', function (err, result) {
      if (result.length > 0) {
        let resultJson = []
        let par = []
        for (var key in result) {
          par.push(ws_b_config.tb_bartender_detail + result[key][0])
        }
        redisdb.mget(par, function (err, mResult) {
          if (!err) {
            for (var j in mResult) {
              let ooo = JSON.parse(mResult[j])
              ooo.gps = result[j][2]
              ooo.distance = result[j][1].substr(0, result[j][1].indexOf('.') + 3)
              resultJson.push(ooo)
            }
          }
          res.send(rm.getSuccessRM('', resultJson))
        })
      }
    })
  }
})
module.exports = router