/*
 * Application Configuration
 * @description :: Server-side logic for configuring expresss application
 */

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

//configure middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//configure routes
var routes = require('./routes/IndexRoute');
var routes_inbound = require('./routes/InboundRoute');

app.use('/', routes);
app.use('/inbound', routes_inbound);


module.exports = app;