var models = require('./models.js');

var Model = function(){}

Model.prototype.get = function(modelName, callback){
	if(modelName == 'clubModel')
	{
		callback(models.clubModel);
	}
	else if(modelName == 'adminModel')
	{
		callback(models.adminModel);	
	}
	else if(modelName == 'studentModel')
	{
		callback(models.studentModel);	
	}
	else if(modelName == 'newClubRequestModel')
	{
		callback(models.newClubRequestModel);	
	}
	else if(modelName == 'clubRemovalRequestModel')
	{
		callback(models.clubRemovalRequestModel);	
	}
	else if(modelName == 'postModel')
	{
		callback(models.postModel);	
	}	
	else
	{
		callback("Error : The model name you are looking is not available. Check the spelling.");
	}
}

module.exports = new Model();