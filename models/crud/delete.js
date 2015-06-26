var model = require('../model.js');

var Delete = function(){}

Delete.prototype.deleteByParameter = function(modelName, query, callback){
	model.get(modelName, function(model){
		model.findOneAndRemove(query, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});	
	});
}

module.exports = new Delete();