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
module.exports = router
