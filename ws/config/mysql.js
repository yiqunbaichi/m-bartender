var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit: 10,
  // host: '10.211.55.8',
  host: '127.0.0.1',
  user: 'wxapp_com',
  password: 'wxappcompany',
  port: '3306',
  database: 'wxapp_com_db'
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
