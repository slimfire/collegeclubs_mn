var model = require('../model.js');

var Create = function() {}

Create.prototype.createByParameter = function(modelName, query, callback){
	var newData;
	model.get(modelName, function(model){
		newData = new model(query);
		newData.save(function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});
	});
}

module.exports = new Create();