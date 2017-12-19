var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')

router.post('/createTradeOrder', function (req, res, next) {
  let url = '/RPCService/webservice/goodsRestApi/getGoodsByGroupId?groupId=0'
  axios.get(url)
    .then(response => {
      if (response.data.resultCode === 200) {
        res.send(rm.getSuccessRM('', JSON.parse(response.data.resultValue)))
      } else {
        res.send(rm.getFailRM('', JSON.parse(response.data.resultDesc), JSON.parse(response.data.resultValue)))
      }
    }).catch(error => {
      console.log(error)
      res.send(rm.getFailRM('', '', ''))
    })
})
module.exports = router
