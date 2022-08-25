var pgOpt = require('pg');
/*
 * 使用连接池
 * */
function connectPgWithPool() {
    var pgConfig = {
        user: 'postgres',
        database: 'infinova_gateway',
        password: 'postgres',
        host: '10.82.27.238',
        port: '5432',
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000
    };
    var pgPool = new pgOpt.Pool(pgConfig);
    // var pgPool = new pgOpt.pools.getOrCreate(pgConfig);// 低版本的pg模块需要这样来创建连接池
    
    pgPool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            done();
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
        })
    });
}
/** 不使用连接池* */
function connectPgWithoutPool() {
    var conStr = "postgres://postgres:postgres@10.82.27.238:5432/infinova_gateway";
    var client = new pgOpt.Client(conStr);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
            client.end();
        })
    })
}
connectPgWithPool();
//connectPgWithoutPool();