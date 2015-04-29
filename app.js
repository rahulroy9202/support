var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');





var app = express();

//configure middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//configure routes
var routes = require('./routes/index');
app.use('/', routes);













module.exports = app;