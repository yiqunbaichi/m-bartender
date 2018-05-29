var express = require('express')
var router = express.Router()
var rm = require('../../config/resultMessage')
var http = require('../../http')
router.get('/getGoodsList', function (req, res, next) {
  // let terminalId = req.query.terminalId
  let url = '/RPCService/webservice/goodsRestApi/getGoodsByGroupId?groupId=0'
  http.get(url)
    .then(response => {
      if (response.data.resultCode === 200) {
        res.send(rm.getSuccessRM('', JSON.parse(response.data.resultValue)))
      } else {
        res.send(rm.getFailRM('', JSON.parse(response.data.resultDesc), JSON.parse(response.data.resultValue)))
      }
    }).catch(error => {
      res.send(rm.getFailRM('', '', ''))
    })
})
router.get('/getProductListByDeviceId', function (req, res, next) {
    // let terminalId = req.query.terminalId
    let url = '/RPCService/webservice/goodsRestApi/getProductListByDeviceId'
    http.get(url,{params: {
        deviceId: req.query.deviceId,
    }
    })
        .then(response => {
            if (response.data.resultCode === 200) {
                res.send(rm.getSuccessRM('', JSON.parse(response.data.resultValue)))
            } else {
                res.send(rm.getFailRM('', JSON.parse(response.data.resultDesc), JSON.parse(response.data.resultValue)))
            }
        }).catch(error => {
        res.send(rm.getFailRM('', '', ''))
    })
})

router.get('/getProductById', function (req, res, next) {
    // let terminalId = req.query.terminalId
    let url = '/RPCService/webservice/goodsRestApi/getProductById'
    http.get(url,{params: {
        sourceType: req.query.sourceType,
        productId:req.query.productId
    }
    })
        .then(response => {
            if (response.data.resultCode === 200) {
                res.send(rm.getSuccessRM('', JSON.parse(response.data.resultValue)))
            } else {
                res.send(rm.getFailRM('', JSON.parse(response.data.resultDesc), JSON.parse(response.data.resultValue)))
            }
        }).catch(error => {
        res.send(rm.getFailRM('', '', ''))
    })
})


router.get('/getBanners', function (req, res, next) {
    let imgUrls= [
        'https://api.riowine.com/upload_file/wx_app/com/banner1.jpg',
        'https://api.riowine.com/upload_file/wx_app/com/banner2.jpg',
        'https://api.riowine.com/upload_file/wx_app/com/banner3.jpg'
    ]
    res.send(rm.getSuccessRM('', imgUrls))


})

module.exports = router
