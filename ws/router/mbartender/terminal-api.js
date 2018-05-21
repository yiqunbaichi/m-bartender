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

router.get('/createTerminal', function (req, res, next) {
    let terminalId = req.query.terminalId;
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let name = req.query.name;
    let imageUrl = req.query.imageUrl;
    let address = req.query.address;
    let tel = req.query.tel;
    ///ws/mbartender/terminalApi/createTerminal?terminalId=10001&latitude=30.315154&longitude=120.109825&name=北城中心1408&imageUrl=http://api.riowine.com:8070/brp/photo/robot/product/R019/1508838552987.png&address=杭州市拱墅区复地北城中心1408&tel=0571-198771
    ///ws/mbartender/terminalApi/createTerminal?terminalId=10002&latitude=31.153835&longitude=121.612268&name=RIO调酒机第一台&imageUrl=http://api.riowine.com:8070/brp/photo/robot/product/R019/1508838552987.png&address=康桥东路538号1楼&tel=0571-198771

    redisdb.geoadd(ws_b_config.tb_bartender_poslist, longitude, latitude, terminalId, function (err, result) {
    })
    // res.send(rm.getSuccessRM('', '0'))

    let v = {
        terminalId: terminalId,
        name: name,
        imageUrl: imageUrl,
        address: address,
        tel: tel
    }
    // let v = {
    //   terminalId: id,
    //   name: '第一台机器',
    //   imageUrl: 'http://api.riowine.com:8070/wx_app/mbartender/icon/rio_logo.png',
    //   address: '康桥东路538号 1楼',
    //   tel: '0571-198771'
    // }
    redisdb.set(ws_b_config.tb_bartender_detail + terminalId, JSON.stringify(v), 0, function (err, result) {
        if (!err) {
            res.send(rm.getSuccessRM('', 'success'))

        }
    })
})
router.get('/terminalInfo', function (req, res, next) {
    let terminalId = req.query.terminalId
    let longitude = req.query.longitude
    let latitude = req.query.latitude
    let radius = req.query.radius
    if (radius == undefined || radius == '' || radius > 20) {
        radius = 5
    }

    if (terminalId!=undefined&&terminalId!='') { // 查询对应的终端
        redisdb.get(ws_b_config.tb_terminal_detail + terminalId, function (err, result) {
            if(result!=null){
                res.send(rm.getSuccessRM('', result))
            }else{
                res.send(rm.getFailRM('','终端编号有误',''))
            }
        })
    } else if ((longitude!=undefined&&longitude!='')&& (latitude!=undefined&&latitude!='')) { // 查询附近终端
        redisdb.georadius(ws_b_config.tb_terminal_poslist, longitude, latitude, radius, 'km', function (err, result) {

            if (result.length > 0) {
                let resultJson = []
                let par = []
                for (var key in result) {
                    par.push(ws_b_config.tb_terminal_detail + result[key][0])
                }
                redisdb.mget(par, function (err, mResult) {
                    if (!err) {
                        for (var j in mResult) {
                            let ooo = JSON.parse(mResult[j])
                            // ooo.gps = result[j][2]
                            ooo.longitude = result[j][2][0]
                            ooo.latitude = result[j][2][1]
                            ooo.distance = result[j][1].substr(0, result[j][1].indexOf('.') + 3)
                            resultJson.push(ooo)
                        }
                    }
                    res.send(rm.getSuccessRM('', resultJson))
                })
            } else {
                res.send(rm.getFailRM('', '暂无门店', ''))

            }
        })
    }
})
module.exports = router
