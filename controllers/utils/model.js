var models = require('../../models/models.js'),
	constants = require('./constants.js');

var Model = function(){}

Model.prototype.get = function(modelName, callback){
	if(modelName == constants.models.CLUB_MODEL)
	{
		callback(models.clubModel);
	}
	else if(modelName == constants.models.ADMIN_MODEL)
	{
		callback(models.adminModel);	
	}
	else if(modelName == constants.models.STUDENT_MODEL )
	{
		callback(models.studentModel);	
	}
	else if(modelName == constants.models.NEW_CLUB_REQUEST_MODEL )
	{
		callback(models.newClubRequestModel);	
	}
	else if(modelName == constants.models.CLUB_REMOVAL_REQUEST_MODEL )
	{
		callback(models.clubRemovalRequestModel);	
	}
	else if(modelName == constants.models.POST_MODEL )
	{
		callback(models.postModel);	
	}	
	else
	{
		callback(constants.models.MODEL_NOT_FOUND);
	}
}

module.exports = new Model();