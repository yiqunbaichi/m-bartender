// var mysql

// !(function () {
//     var ws_wxapp_baseURL = 'http://127.0.0.1:8080'
// })
// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: '10.211.55.8',
//     // host: '127.0.0.1',
//     user: 'wxapp_com',
//     password: 'wxappcompany',
//     port: '3306',
//     database: 'wxapp_com_db'
// })

var env = {
    /**本地**/
    //ws
    ws_wxapp_baseURL : 'http://127.0.0.1:8080',
    //mysql
    mysql_connectionLimit: 10,
    mysql_host: '10.211.55.8',
    mysql_user: 'wxapp_com',
    mysql_password: 'wxappcompany',
    mysql_port: '3306',
    mysql_database: 'wxapp_com_db',
    //redis
    redis_port : 6379,
    redis_host : '10.211.55.8',
    // redis_host = '127.0.0.1',
    redis_pwd : 'rd@rio',
    redis_opts:{}

}

module.exports = env
