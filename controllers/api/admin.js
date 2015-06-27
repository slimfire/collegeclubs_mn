var crud = require('../../models/crud/crud.js');

var Admin = function(){}

Admin.prototype.getClubRequests = function(callback){
	var query = {
		query : {},
		options : {__v : 0}
	};
	crud.read.readByParameter('newClubRequestModel', query, function(response){
		callback(response);
	});
}

Admin.prototype.approveClubRequest = function(clubId, callback){
	var query = {
		query : {_id : clubId},
		options : {__v : 0}
	};
	crud.read.readByParameter('newClubRequestModel', query, function(response1){
		if(response1)
		{
			crud.delete.deleteByParameter('newClubRequestModel', {_id : clubId}, function(response2){
				crud.create.createByParameter('clubModel', response2, function(response3){
					callback(response3);
				});
			});
			
		}
		else
		{
			callback({error : 'couldn\'t find club :/'});
		}
	});
	
}

Admin.prototype.declineClubRequest = function(clubId, callback){
	crud.delete.deleteByParameter('newClubRequestModel', {_id : clubId}, function(response){
		if(response)
		{
			console.log('delete');
			callback(response);
		}
		else
		{
			callback({error : 'club could not be found!'});
		}
	});
	
}

module.exports = new Admin();