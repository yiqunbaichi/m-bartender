var express = require('express')
var router = express.Router()

router.get('/terminal', function (req, res, next) {
  let terminalId = req.query.terminalId
    res.send(terminalId)

})

router.get('/ZJG7T8OAvE.txt', function (req, res, next) {
    let terminalId = req.query.terminalId
    res.send("5476af810ce1276192d7eea83b4c7e21")

})


module.exports = router
