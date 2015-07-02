var crud = require('../../models/crud/crud.js');

var Admin = function(){}

Admin.prototype.getClubRequests = function(callback){
	var query = {
		query : {},
		options : {__v : 0}
	};
	crud.read.readAll('newClubRequestModel', query, function(response){
		callback(response);
	});
}

Admin.prototype.approveClubRequest = function(clubId, callback){
	var query = {
		query : {_id : clubId},
		options : {__v : 0}
	};
	crud.read.readByParameter('newClubRequestModel', query, function(club){
		if(club)
		{
			crud.delete.deleteByParameter('newClubRequestModel', {_id : clubId}, function(deletedClub){
				crud.create.createByParameter('clubModel', deletedClub, function(newClub){
					callback(newClub);
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
			callback({status : 200, error : null});
		}
		else
		{
			callback({status : 500, error : 'club could not be found!'});
		}
	});
	
}

module.exports = new Admin();