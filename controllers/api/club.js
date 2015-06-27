var crud = require('../../models/crud/crud.js');

var Club = function(){}

Club.prototype.addClub = function(clubName, universityAt, firstName, lastName, email, callback) {
	var response;
	var parameters = {
		clubName: clubName,
		universityAt: universityAt
	};
	crud.read.readByParameter('newClubRequestModel', parameters, function(data){
		if(!data)
		{
			parameters.leaders = [{firstName : firstName, lastName : lastName, email : email}];
			crud.create.createByParameter('newClubRequestModel', parameters, function(data){
				response = {
					error : null,
					response : {
						clubInfo : data
					}
				}
				callback(response);
			});
		}
		else
		{
			response = {
				error : 'club already exists',
				response : {}
			};
			callback(response);
		}
	});
};

Club.prototype.removeClub = function(clubName, universityAt, firstName, lastName, email, callback) {
	var response;
	var parameters = {
		clubName: clubName,
		universityAt: universityAt
	};
	crud.read.readByParameter('clubModel', parameters, function(data){
		if(data)
		{
			parameters.requester = {
				firstName : firstName, 
				lastName : lastName,
				email : email
			};
			crud.create('clubRemovalRequestModel', parameters, function(data){
				if(data)
				{
					response = {
						error : null,
						response : parameters
					};
					callback(response);
				}
				else
				{
					response = {
						error : 'club does not exists',
						response : {}
					};
					callback(response);
				}
			});
		}
		else
		{
			response = {
				error : 'club does not exist',
				response : {}
			}
			callback(response);
		}
	});
};


module.exports = new Club();