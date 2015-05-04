/*
 * InboundModel
 * @description :: Server-side logic for defining inbound model
 */

var mongoose = require('mongoose');

var inboundSchema = mongoose.Schema({

	type: {
		type: String,
		required: true
	},
	
	data: {
		type: mongoose.Schema.Types.Mixed,
	},
	
	created: {
		type: Date,
		required: true
	},
    
    updated: {
		type: Date,
		required: true
	}
    
});

module.exports = mongoose.model('inbound', inboundSchema);