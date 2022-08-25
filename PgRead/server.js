var util = require('util');
var express = require('express');
var app = express();

var PostgreSql = require("./postgreSql");
const { Server } = require('http');
var postgreSql = new PostgreSql();

app.get('/', function (req, res) {
    res.send('Hello World '+ req.hostname);
});

app.get('/search', function (req, res) {
    var sqlString = "select * from transport_instance where id= 105981";
    postgreSql.searchData(sqlString,function (searchData) {
        res.send(JSON.stringify(searchData));
    });
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

