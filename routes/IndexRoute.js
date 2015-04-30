/*
 * IndexRoute
 * @description :: Server-side logic for defining index routes
 */

var express = require('express');
var router = express.Router();

//hello
router.get('/', function(req, res, next) {
	res.json({success:'true', data: { status: 'ok', message: 'hello' }});
});


module.exports = router;
