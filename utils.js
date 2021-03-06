var mongoose = require("mongoose");

module.exports.initDB = function (_url, _cb) {
	
    var options = {
        db: {native_parser: true},
        server: {
			poolSize: 5,
			socketOptions: {keepAlive: 1}
		}
    }
	
	mongoose.connect(_url, options);
    var db = mongoose.connection;
	
    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        //mongoose.disconnect();
    });
	
    db.on('reconnected', function() {
        console.log('MongoDB reconnected!');
    });
	
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        
		if(typeof(_cb)==='function'){
			console.log(_url, options);
			setTimeout(function () {
				_cb(_url)
				//mongoose.connect(_url, options);
			}, 100)
		}

    });
	
    db.once('open', function() {
        console.log('MongoDB connection opened!');
    })
	
    db.once('connected', function() {
        console.log("----connected to database at %s", _url);
    });
	
	return db;
}
