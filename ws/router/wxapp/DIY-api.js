var express = require('express')
var router = express.Router()
var rm = require('../../config/resultMessage')
var http = require('../../http')
router.get('/getDIYProductList', function (req, res, next) {
  let memberId = req.query.memberId
  let url = '/RPCService/webservice/diyRestApi/getDiyProductList'
  http.get(url,{params: {
      memberId: memberId,
    }
  })
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

router.post('/createOrUpdateDiyProduct', function (req, res, next) {
  // try{
      let operateType  =   req.body.operateType

      if(operateType==undefined){
          res.send(rm.getFailRM('', '参数有误', ''))
          return
      }
    let parameter
    let productObj = new Object()
      if(operateType=='U'){
          let materials = JSON.parse(req.body.DIYMaterial)
          let desc=''
          for(let i = 0 ;  i < materials.length ;i++) {
              desc = desc+','+materials[i].materialName
          }
          if (desc.substr(0,1)==',') {
              desc=desc.substr(1)
          }
              productObj.memberId = req.body.memberId
              productObj.productName = req.body.productName
              productObj.price = 0.1
          let prices = [{"price":0.1,"priceId":0,"productId":0}]
              productObj.prices = prices
              productObj.materials =   materials
              productObj.productNumber = 'DIY'
              productObj.materialDesc  =desc
              productObj.productDesc = '由'+desc+'组成'
              productObj.mWine=req.body.mWine,
              productObj.sWine=req.body.sWine,
              productObj.mIngredients=req.body.mIngredients,
              productObj.sIngredients=req.body.sIngredients,
              productObj.alcohol=req.body.alcohol,
              productObj.waters=req.body.waters,
          parameter ={
              memberId: req.body.memberId,
              type:operateType,
              productStr:JSON.stringify(productObj)
          }
      }else  if(operateType=='D') {
          productObj.productId = req.body.productId
          productObj.memberId = req.body.memberId
          parameter ={
              productStr:JSON.stringify(productObj),
              type:operateType
          }
      }
    let url = '/RPCService/webservice/diyRestApi/createOrUpdateDiyProduct'
    http.post(url,parameter) .then(response => {
          res.send(response.data)
        }).catch(error => {
          res.send(rm.getFailRM('', '', ''))
    })
   // }catch(e){
   //    console.log(e)
   //         res.send(rm.getFailRM('', '', ''))
   // }
})



router.get('/getRawMaterial', function (req, res, next) {
    let memberId = req.query.memberId
    let url = '/RPCService/webservice/diyRestApi/getRawMaterial'
    http.get(url)
        .then(response => {
                res.send(response.data)
        }).catch(error => {
        console.log(error)
        res.send(rm.getFailRM('', '', ''))
    })
})

module.exports = router
