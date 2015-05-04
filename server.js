#!/usr/bin/env node

var app = require('./app');
var http = require('http');

var utils = require('./utils');
var config = require('./config');

var port = config.port;
app.set('port', port);

var ip = config.ipaddress;
app.set('ip', ip);

utils.initDB(config.dburl, utils.initDB);

var server = http.createServer(app);
server.listen(port,ip);

console.log('server listening on: http://'+ip+':'+port);