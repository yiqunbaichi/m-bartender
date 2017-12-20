var redisdb = {}
var redis = require('redis'),
  RDS_PORT = 6379,
  // RDS_HOST = '10.211.55.8',
  RDS_HOST = '127.0.0.1',
  RDS_PWD = 'rd@rio',
  RDS_OPTS = {},
  client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS)

client.auth(RDS_PWD, function () {
  console.log('通过认证')
})
client.select('4')
client.on('error', function (err) {
  console.log('Error :', err)
})
client.on('connect', function () {
  console.log('connect')
})
client.on('ready', function (err) {
  console.log('ready', err)
})
/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 * @param callBack(err,result)
 */
redisdb.set = function (key, value, expire, callback) {
  client.set(key, value, function (err, result) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }

    if (!isNaN(expire) && expire > 0) {
      client.expire(key, parseInt(expire))
    }

    callback(null, result)
  })
}

/**
 * 查询string类型的数据
 * @param key 键
 * @param callBack(err,result)
 */
redisdb.get = function (key, callback) {
  client.get(key, function (err, result) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }

    callback(null, result)
  })
}
redisdb.mget = function (keys, callback) {
  client.mget(keys, function (err, result) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }

    callback(null, result)
  })
}

redisdb.geoadd = function (key, longitude, latitude, member, callback) {
  client.geoadd(key, longitude, latitude, member, function (err, result) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }
    callback(null, result)
  })
}

redisdb.georadius = function (key, longitude, latitude, radius, unit, callback) {
  client.georadius(key, longitude, latitude, radius, unit, 'withdist', 'withcoord', 'asc', function (err, result) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }
    callback(null, result)
  })
}
module.exports = redisdb
