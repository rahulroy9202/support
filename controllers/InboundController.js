/*
 * InboundController
 * @description :: Server-side logic for handling inbound data requests
 */

var inboundModel = require('../models/InboundModel');

module.exports = {
	
	list: function(req, res, next) {
		res.send('list');
		next();
	},
	
	create: function(req, res, next) {
		res.send('new');
		next();
	}
};
