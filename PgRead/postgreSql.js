var pg = require("pg");
function PostgreSql() {
    // 数据库配置
    var config = {
        user:"postgres",
        database:"infinova_gateway",
        password:"postgres",
        host: '10.82.27.238',
        port:5432,
        // 扩展属性
        max:20, // 连接池最大连接数
        idleTimeoutMillis:3000, // 连接最大空闲时间 3s
        poolIdleTimeout:3000,
        reapIntervalMillis:1000
    };

    // 创建连接池
    var pool = new pg.Pool(config);

    this.searchData = function (sqlString,callback) {
        // "SELECT * from users"
        // 查询
        pool.connect(function(err, client, done) {
            if(err) {
                return console.error('数据库连接出错', err);
            }
            client.query(sqlString, function(err, result) {
                done();// 释放连接（将其返回给连接池）
                if(err) {
                    return console.error('查询出错', err);
                }
                return callback(result.rows);
            });
        });
    }
}
module.exports = PostgreSql;