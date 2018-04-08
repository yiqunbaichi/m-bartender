var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')
var redisdb = require('../../config/redis')
var ws_b_config = require('../../config/wsBartenderConfig')
var http = require('../../http')

router.post('/wxUnifiedorder', function (req, res, next) {
    let payJson =  req.body.payJson
    let payObj = JSON.parse(payJson)
    let token  =  req.body.token
    redisdb.get(ws_b_config.tb_js_token + token, function (err,result) {
        if(result!=null){
            let url = '/RPCService/webservice/wxPayRestApi/wxUnifiedorder'
            let user  = JSON.parse(result) ;
            axios.get(url,{  params: {
                title: payObj.title,
                out_trade_no: payObj.out_trade_no,
                total_fee: payObj.total_fee * 100,
                product_id: payObj.product_id,
                ip: payObj.ip,
                openId: user.openid
            }
            })
                .then(response => {
                    console.log(response.data)
                    res.send(response.data)
                }).catch(error => {
                console.log(error)
                res.send(rm.getFailRM('', '', ''))
            })

        }else{
            res.send(rm.getSuccessRM('token invalid',''))
        }
    })
})


router.get('/wxPayOrderQuery', function (req, res, next) {
            let url = '/RPCService/webservice/wxPayRestApi/wxPayOrderQuery'

            axios.get(url,{  params: {
                out_trade_no: req.query.out_trade_no,
                memberId:req.query.memberId
            }
            }).then(response => {
                    console.log(response.data)
                    res.send(response.data)
                }).catch(error => {
                console.log(error)
                res.send(rm.getFailRM('', '', ''))
            })

})




router.post('/createTradeOrder', function (req, res, next) {
    let orderJson =  req.body.orderJson
    let orderTotal = JSON.parse(orderJson)
    orderTotal.orderSource = 63
    orderTotal.orderTitle = orderTotal.orderDetailList.productName+orderTotal.orderDetailList.quantity+'杯'
    orderTotal.isPayed = 'N'
    let url = '/RPCService/webservice/orderRestApi/createOrder'
    http.post(url, {orderTotal:JSON.stringify(orderTotal)})
      .then(response => {
        if (response.data.resultCode === 200) {
          res.send(rm.getSuccessRM('', JSON.parse(response.data.resultValue)))
        } else {
          res.send(rm.getFailRM('', response.data.resultDesc, ''))
        }
      }).catch(error => {
        res.send(rm.getFailRM('', '', ''))
      })

})


router.get('/getOrderByoperatorId', function (req, res, next) {
    let memberId =  req.query.memberId
    let start = req.query.start
    let end = req.query.end

    if(start==undefined||end==undefined){
        start =''
        end =''
    }
    let url = '/RPCService/webservice/orderRestApi/getOrderByOperatorId'
    axios.post(url, {operatorId:memberId,
        start:start,
        end:end
    })
        .then(response => {
            if (response.data.resultCode === 200) {
                let value  = JSON.parse(response.data.resultValue)
                let  vResult  = value.result
                let list =[]
                    for(var i=0; i<vResult.length; i++)
                    {
                        vResult[i].orderDetailList=''
                        vResult[i].operatorId = ''
                        list.push(vResult[i])

                    }

                res.send(rm.getSuccessRM('', JSON.stringify(list)))
            } else {
                res.send(rm.getFailRM('', response.data.resultDesc, ''))
            }
        }).catch(error => {
        console.log(error)
        res.send(rm.getFailRM('', '', ''))
    })

})




router.get('/getOrderByOrderId', function (req, res, next) {
    let tradeId =  req.query.tradeId
    let memberId = req.query.memberId
    if(tradeId==undefined){
        res.send(rm.getFailRM('', '参数有误', ''))

    }
    let url = '/RPCService/webservice/orderRestApi/getOrderByOrderId'
    axios.post(url, {operatorId:memberId,
        orderId:tradeId
    })
        .then(response => {
            if (response.data.resultCode === 200) {
                let value  = JSON.parse(response.data.resultValue)
                res.send(rm.getSuccessRM('', JSON.stringify(value)))
            } else {
                res.send(rm.getFailRM('', response.data.resultDesc, ''))
            }
        }).catch(error => {
        console.log(error)
        res.send(rm.getFailRM('', '', ''))
    })

})


module.exports = router
