var express = require('express')
var axios = require('axios')
var router = express.Router()
var rm = require('../../config/resultMessage')
var redisdb = require('../../config/redis')
var ws_b_config = require('../../config/wsBartenderConfig')
var crypto = require('crypto')

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
router.get('/getToken', function (req, res, next) {
    let js_code = req.query.js_code;
    if (js_code != undefined && js_code!= null) {
        let url = 'https://api.weixin.qq.com/sns/jscode2session'
        axios.get(url, {
            params: {
                appid: ws_b_config.appid,
                secret: ws_b_config.secret,
                js_code: js_code,
                grant_type: 'authorization_code'
            }
        }).then(response => {
            let resData = response.data
            if(resData.errcode!=undefined||resData.errcode!=null){
                res.send(rm.getFailRM('',resData.errmsg,''))
                return
            }
            let token = cryptPwd(resData.session_key + '&' + resData.openid)
            redisdb.set(ws_b_config.wxapp_tb_js_token + token, JSON.stringify(resData), 3600, function (err, result) {
                if (!err) {
                    res.send(rm.getSuccessRM('success', token))
                }
            })
        }).catch(error => {
            console.log(error)
            res.send(rm.getFailRM('', '', ''))
        })

    } else {
        res.send(rm.getFailRM('','code is null',''))

    }


})


router.get('/checkToken', function (req, res, next) {
    let token = req.query.token;
    if(token== ''||token==undefined){
        res.send(rm.getSuccessRM('token invalid',''))
    }else{
        redisdb.get(ws_b_config.wxapp_tb_js_token + token, function (err,result) {
            if(result!=null){
                res.send(rm.getSuccessRM('success',token))
            }else{
                res.send(rm.getSuccessRM('token invalid',''))
            }
        })

    }
})


module.exports = router
