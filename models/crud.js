var model = require('./model.js');

//Database CRUD operations
var Crud = function(){}

Crud.prototype.create = function(modelName, parameters, callback){
	var newData;
	model.get(modelName, function(model){
		newData = new model(parameters);
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

Crud.prototype.read = function(modelName, parameters, callback){
	model.get(modelName, function(model){
		model.findOne(parameters, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}

		});
	});
}

Crud.prototype.update = function(modelName, searchKey, newData, callback){
	model.get(modelName, function(model){
		model.findOneAndUpdate(searchKey, newData, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});
	});
}

Crud.prototype.delete = function(modelName, parameters, callback){
	model.get(modelName, function(model){
		model.findOneAndRemove(parameters, function(error, data){
			try{
				callback(data);
			}
			catch(error){
				console.log(Error(error));
			}
		});	
	});
}

module.exports = new Crud();