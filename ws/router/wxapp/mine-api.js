var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')
var redisdb = require('../../config/redis')
var ws_b_config = require('../../config/wsBartenderConfig')

router.post('/getMemberInfo', function (req, res, next) {
    let token  =  req.body.token
    let wxUserInfoJson  =  req.body.wxUserInfoJson

    redisdb.get(ws_b_config.tb_js_token + token, function (err,result) {
        if(result!=null){
            let url = '/RPCService/webservice/memberRestApi/getMemberInfo'
            let user  = JSON.parse(result) ;
            let wxUserInfoObj  = JSON.parse(wxUserInfoJson) ;
            let memberInfo  = {
                wxOpenId: user.openid,
                nickname: wxUserInfoObj.nickName,
                sex: wxUserInfoObj.gender,
                city: wxUserInfoObj.city,
                province: wxUserInfoObj.province,
                country: wxUserInfoObj.country,
                headimgurl: wxUserInfoObj.avatarUrl
            }
            axios.post(url,{memberInfo:JSON.stringify(memberInfo)})
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
        }else{
            res.send(rm.getSuccessRM('token invalid',''))
        }
    })




})

module.exports = router
