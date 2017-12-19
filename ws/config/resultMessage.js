var rm = {
  getSuccessRM: function (resultDesc, resultValue) {
    return {
      'resultCode': 200,
      'resultDesc': isNaN(resultDesc) ? 'success' : resultDesc,
      'resultValue': resultValue
    }
  },
  getFailRM: function (resultCode, resultDesc, resultValue) {
    return {
      'resultCode': isNaN(resultCode) ? 300 : resultCode,
      'resultDesc': isNaN(resultDesc) ? 'fail' : resultDesc,
      'resultValue': resultValue
    }
  },
  getErrorVerify: function () {
    return {
      'resultCode': 1404,
      'resultDesc': 'error verify',
      'resultValue': ''
    }
  }

}

module.exports = rm
