#!/usr/bin/env node
/*
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World Dadum Tush");
  response.end();
}).listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

*/

var app = require('./app');
var http = require('http');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || '8080';
app.set('port', port);

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.set('ip', ip);



var server = http.createServer(app);
server.listen(port,ip);