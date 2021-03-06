var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')
var redisdb = require('../../config/redis')
var ws_b_config = require('../../config/wsBartenderConfig')
var http = require('../../http')
var env = require("../../config/env");
router.post('/wxUnifiedorder', function (req, res, next) {
    let payJson =  req.body.payJson
    let payObj = JSON.parse(payJson)
    let token  =  req.body.token
    redisdb.get(ws_b_config.wxapp_tb_js_token + token, function (err,result) {
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
    http.post(env.ws.createOrder, {orderTotal:JSON.stringify(orderTotal)})
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
    axios.post(env.ws.getOrderByOperatorId, {operatorId:memberId,
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
                        // vResult[i].orderDetailList=''
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
    axios.post(env.ws.getOrderByOrderId, {operatorId:memberId,
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




router.post('/refundOrder', function (req, res, next) {
    let orderId =  req.body.orderId
    let refundFee =  req.body.refundFee
    let refundDesc =  req.body.refundDesc

    http.post(env.ws.refundOrder, {
        orderId:orderId,
        refundFee:refundFee,
        refundDesc:refundDesc
    })
        .then(response => {
            console.log(response.data)
            if (response.data.resultCode == 200) {
                res.send(rm.getSuccessRM('', response.data.resultValue))
            } else {
                res.send(rm.getFailRM('', response.data.resultDesc, ''))
            }
        }).catch(error => {
        res.send(rm.getFailRM('', '', ''))
    })

})





router.get('/sendTemplate', function (req, res, next) {
    let token  =  req.body.token
    redisdb.get(ws_b_config.access_token+'_'+ws_b_config.appid + token, function (err,result) {
        if (result != null) {
            sendTemplate(result,function (success,sp) {
                if(success){
                    res.send(rm.getSuccessRM('','',''))

                }else{
                    res.send(rm.getFailRM('','',''))

                }
            })

        }else{
            //获取token
            axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: ws_b_config.appid,
                    secret: ws_b_config.secret,
                }
            }).then(response => {
                let resData = response.data
                console.log(resData)
                if(resData.errcode!=undefined){
                        res.send(rm.getFailRM('',resData.errmsg,''))
                }
                redisdb.set(ws_b_config.access_token+'_'+ws_b_config.appid ,resData.access_token, 3600, function (err, result) {
                    if (!err) {
                        sendTemplate(resData.access_token,function (success,sp) {
                            if(success){
                                res.send(rm.getSuccessRM('','',''))

                            }else{
                                res.send(rm.getFailRM('','',''))

                            }
                        })



                    }
                })
            }).catch(error => {
                console.log(error)
                res.send(rm.getFailRM('', '', ''))
            })
        }
    })
    // let js_code = req.query.js_code;
    // if (js_code != undefined && js_code!= null) {
    //
    //
    // } else {
    //     res.send(rm.getFailRM('','code is null',''))
    //
    // }


})

function sendTemplate(accessToken,cb) {
    axios.get('/RPCService/webservice/wxTemplateApi/sendTemplate', { params: {accessToken:accessToken}})
        .then(response => {
            cb(true,response.data)
            // if (response.data.resultCode === 200) {
            //
            //
            //     res.send(rm.getSuccessRM('', JSON.stringify(list)))
            // } else {
            //     res.send(rm.getFailRM('', response.data.resultDesc, ''))
            // }
        }).catch(error => {
        cb(false,response.data)

        // console.log(error)
        // res.send(rm.getFailRM('', '', ''))
    })


    // console.log(accessToken)
    //
    //
    //
    // // return new Promise((resolve, reject) => {
    //     let opts = {
    //         touser: 'oNQs34wBm1XwBeoqtvsdztGZVEV4',
    //         template_id: 'mQUVQ5hvpxW-0zEWIUQFy1PLcOZwmYAgiFd3jiN05AM',
    //         page: '/page/trade/orderdetail/main?orderId=63152706146104410000287038',
    //         form_id: 'wx23154536889753af7eb5af832901920868',
    //         data: {
    //             "keyword1": {
    //                 "value": "63152628399078510000067074",
    //                 "color": "#1d1d1d"
    //             },
    //             "keyword2": {
    //                 "value": "2017年05月05日 12:30",
    //                 "color": "#1d1d1d"
    //             },
    //             "keyword3": {
    //                 "value": "杭州一店",
    //                 "color": "#1d1d1d"
    //             },
    //             "keyword4": {
    //                 "value": "很棒",
    //                 "color": "#1d1d1d"
    //             },
    //         }
    //     }
    //
    //     console.log(JSON.stringify(opts))
    //
    //
    //
    //
    //
    //
    // //
    // axios.defaults.headers = {
    //     // 'Content-Type': 'multipart/form-data'
    //     'Content-Type': 'application/json'
    //
    // }
    // // //获取token
    // axios.post('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+accessToken,JSON.stringify(opts)).then(response => {
    //     console.log(response.data)
    //     if(response.data.errcode=0){
    //         cb(true,response.data)
    //
    //     }else{
    //         cb(false,response.data)
    //
    //     }
    // }).catch(error => {
    //     cb(false,error)
    //     console.log(error)
    //
    //
    // })


}


function getwxacodeunlimit(accessToken,cb){
    let postData = {"width":"430","path":"pages/goods/list/main","scene":"42"}

    axios.defaults.headers = {
        // 'Content-Type': 'multipart/form-data'
        'content-type': 'application/json; charset=UTF-8'
    }
    console.log(accessToken);
    // //获取token
    axios.post('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+accessToken,
       postData ).then(response => {
            console.log(response.data)

            if(response.data.errcode=0){
                cb(true,response.data)

            }else{
                cb(false,response.data)

            }
        }).catch(error => {
        cb(false,error)
        console.log(error)


    })
}

router.get('/getwxacodeunlimit', function (req, res, next) {
    redisdb.get(ws_b_config.access_token+'_'+ws_b_config.appid , function (err,result) {
        if (result != null) {
            getwxacodeunlimit(result,function (success,sp) {
                if(success){
                    res.send(rm.getSuccessRM('','',''))

                }else{
                    res.send(rm.getFailRM('','',''))

                }
            })

        }else{
            //获取token
            axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: ws_b_config.appid,
                    secret: ws_b_config.secret,
                }
            }).then(response => {
                let resData = response.data
                if(resData.errcode!=undefined){
                    res.send(rm.getFailRM('',resData.errmsg,''))
                }
                redisdb.set(ws_b_config.access_token+'_'+ws_b_config.appid ,resData.access_token, 3600, function (err, result) {
                    if (!err) {
                        getwxacodeunlimit(resData.access_token,function (success,sp) {
                            if(success){
                                res.send(rm.getSuccessRM('','',''))

                            }else{
                                res.send(rm.getFailRM('','',''))

                            }
                        })



                    }
                })
            }).catch(error => {
                console.log(error)
                res.send(rm.getFailRM('', '', ''))
            })
        }
    })



})





module.exports = router
