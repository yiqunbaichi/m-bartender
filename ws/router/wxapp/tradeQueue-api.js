var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')
var redisdb = require('../../config/redis')
var ws_b_config = require('../../config/wsBartenderConfig')
var http = require('../../http')
var env = require("../../config/env");

router.get('/getTradeQueue', function (req, res, next) {
    let memberId =  req.query.memberId
    axios.get(env.ws.getTradeQueue, {
        params: {
            deviceId: req.query.deviceId
        }
    }).then(response => {
        if (response.data.resultCode === 200) {
            let resultJson =''
            if(response.data.resultValue=='null'){
                 resultJson = {sum:0,currOrderId:0}
            }else{
                let list = JSON.parse(response.data.resultValue)
                let waitCount = 0
                let firstNo = 0

                for (var i=0; i<list.length;i++) {
                    if (list[i].memberInfo.memberId == memberId) {
                        waitCount++
                    }
                }
                for (var i=0; i<list.length;i++) {

                    if(list[i].memberInfo.memberId ==memberId){
                        if(i==0){
                            resultJson = {sum:0,currOrderId:list[i].orderId,}
                            break;
                        }else{
                            firstNo =i ;
                            break;
                        }
                    }
                }
                if(firstNo!=0){
                    resultJson = {sum:firstNo,currOrderId:0,waitCount:waitCount}
                }

                if(resultJson==''){
                    resultJson = {sum:list.length,currOrderId:0}
                }
            }

            res.send(rm.getSuccessRM('success', JSON.stringify(resultJson)))

        }

    }).catch(error => {
        console.log(error)
        res.send(rm.getFailRM('', '', ''))
    })


//没点过 --当前需等待N位
    //点过 --- 您有几杯，还需等待N位
    //     --- 到了。跳转订单页面

})



module.exports = router
