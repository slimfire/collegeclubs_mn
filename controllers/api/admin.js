var crud = require('../../models/crud/crud.js');

var Admin = function(){}

Admin.prototype.getClubRequests = function(callback){
	crud.read.readByParameter('newClubRequestModel', {}, function(response){
		callback(response);
	});
}

Admin.prototype.approveClubRequest = function(clubId, callback){
	crud.read.readByParameter('newClubRequestModel', {_id : clubId}, function(response1){
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