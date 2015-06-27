var model = require('../model.js');

var Read = function(){}

Read.prototype.readByParameter = function(modelName, query, callback){
	model.get(modelName, function(model){
		model.findOne(query.query, query.options, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});
	});
}

module.exports = new Read();