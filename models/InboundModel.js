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

/*
inboundSchema.methods.processRequest = function(req) {
    this.user_agent = headers['user-agent'];
	this.referer = headers.referer;
};
//_inbound.processRequest(req);
*/
module.exports = mongoose.model('inbound', inboundSchema);