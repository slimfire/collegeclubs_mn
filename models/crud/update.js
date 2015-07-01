var model = require('../model.js');

var Update = function(){}

Update.prototype.pushToSubDocument = function(modelName, query, update, callback){
	model.get(modelName, function(model){
		model.where(query)
			  .setOptions({overwrite: true})
			  .update({$push : update}, function(error, data){
				if(error)
				{
					throw Error(error);
				}
				callback(data);
		});
	});
}

Update.prototype.replaceDocument = function(modelName, query, update, callback){
	model.get(modelName, function(model){
		model.findOneAndUpdate(query, update, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});
	});
}


module.exports = new Update();