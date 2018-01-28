var mysql = require('mysql')
var env = require('../config/env')

var pool = mysql.createPool({
  connectionLimit: env.mysql_connectionLimit,
  host: env.mysql_host,
  // host: '127.0.0.1',
  user: env.mysql_port,
  password:env.mysql_password,
  port: env.mysql_port,
  database: env.mysql_database
})
var mysqldb = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null)
      console.log('链接数据库OK')
    } else {
      console.log('链接数据库OK')
      conn.query(sql, function (qerr, vals, fields) {
        conn.release()
        callback(qerr, vals, fields)
      })
    }
  })
}

module.exports = mysqldb
