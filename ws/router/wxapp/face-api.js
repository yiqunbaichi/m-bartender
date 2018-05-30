var express = require('express')
var router = express.Router()
var rm = require('../../config/resultMessage')
var http = require('../../http')

var fs = require("fs");
var formidable = require('formidable');
var path = require("path");
const https = require('https');
const querystring = require('querystring');

var env = require("../../config/env");


router.post('/faceDetect', function (req, res, next) {
    //处理用户信息


    //处理文件
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = env.upload_file;//上传文件的保存路径
    form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send(rm.getFailRM('', '', ''))

        }
        var filename = files.file.name
        var memberId = fields.memberId
        var sourceDeviceId = fields.sourceDeviceId
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var avatarName = getNowFormatDate() + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.file.path, newPath);  //重命名

        //上传人脸识别
        let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect'
        var imageBuf = fs.readFileSync(form.uploadDir + "/" + avatarName);


        var data = {
            api_key: "w41xriOzA9ovJOuO6fATgfHrGQBJFrgG",
            api_secret: "9TR3i9trxAo03cL2P-28ScVA7_aHtw6h",
            return_landmark: '0',
            return_attributes: 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus',
            image_base64: imageBuf.toString("base64")
        }


        http.post('https://api-cn.faceplusplus.com/facepp/v3/detect',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then(response => {
               let  faceData = response.data.faces
                if (faceData.error_message != undefined) {
                    res.send(rm.getFailRM('', faceData.error_message, ''))
                } else if (faceData.length >1) {
                    res.send(rm.getFailRM('', '检测到多张人脸', ''))

                } else if (faceData[0]==undefined||faceData[0].face_token == undefined) {
                    res.send(rm.getFailRM('', '图片非人脸', ''))
                } else {
                    //调用rpc创建用户对应face关系
                    http.post(env.ws.uploadMemberFaceToken, {
                        memberId: memberId,
                        sourceDeviceId:sourceDeviceId==undefined?'':sourceDeviceId,
                        faceToken: faceData[0].face_token

                    })
                        .then(response => {
                            if (response.data.resultCode === 200) {
                                res.send(rm.getSuccessRM('', response.data.resultValue))
                            } else {
                                res.send(rm.getFailRM('', JSON.parse(response.data.resultDesc), response.data.resultValue))
                            }
                            return
                        }).catch(error => {
                        res.send(rm.getFailRM('', '', ''))
                        return

                    })
                }


            }).catch(error => {
            console.log(error)
            res.send(rm.getFailRM('', '', ''))
        })


    })


})


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + "" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


router.get('/getMemberFaceToken', function (req, res, next) {
    http.get(env.ws.getMemberFaceToken, {
        params: {
            memberId: req.query.memberId
        }
    })
        .then(response => {
                res.send(response.data)

        }).catch(error => {
        res.send(rm.getFailRM('', '', ''))
    })
})

//
// router.get('/test', function (req, res, next) {
//     let url = env.ws.addFaceToFaceset
//     http.get(url, {
//         params: {
//             memberId: "b05f1ff83e1f4fa1dc010a46df3b024b",
//             deviceId:"42"
//         }
//     })
//         .then(response => {
//             res.send(response.data)
//
//         }).catch(error => {
//         res.send(rm.getFailRM('', '', ''))
//     })
// })
// router.get('/test', function (req, res, next) {
//     let url = env.ws.addFaceToFaceset
//     http.get(url, {
//         params: {
//             memberId: "b05f1ff83e1f4fa1dc010a46df3b024b",
//             deviceId:"42"
//         }
//     })
//         .then(response => {
//             res.send(response.data)
//
//         }).catch(error => {
//         res.send(rm.getFailRM('', '', ''))
//     })
// })




module.exports = router
