/*
 * InboundController
 * @description :: Server-side logic for handling inbound data requests
 */

var inboundModel = require('../models/InboundModel');
var slugify = require('../services/Slugify');
var url = require('url');
var _ = require('lodash');

var rpp = 100;

module.exports = {
	
	list: function(req, res, next) {
        try {
            _page = req.params.page || req.body.page || 0;
            inboundModel.find({}).sort({updated: -1}).limit(rpp).skip(_page * rpp).exec(function(err, doc) {
                if(err) return res.json({success: false, error: err});
                return res.json({success: true, data: doc});               
            });
        }
        catch(e) {
            console.log('error: ', e);
            return res.json({success: false, error: e});
        }
	},
	
	create: function(req, res, next) {
        try {
            
            var _payload = {};
            
            _payload.url = req.url;
            _payload = _.extend(_payload, req.body);
            _payload = _.extend(_payload, url.parse(req.url, true).query);
            _payload = _.extend(_payload, req.params);
            
            var _inbound  = new inboundModel();
            _inbound.data = slugify(_payload);
            _inbound.type = req.params.type || req.body.type || req.query.type || "unknown";
            _inbound.created = _inbound.updated = new Date();
            
            _inbound.save(function (err, doc) {
                if(err) return res.json({success: false, error: err});
                return res.json({success: true, data: doc});
            });
    
        }
        catch(e) {
            console.log('error: ', e);
            return res.json({success: false, error: e});
        }
	}
};
