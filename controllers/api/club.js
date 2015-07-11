var crud = require('../../models/crud/crud.js');

var Club = function(){}

Club.prototype.addClub = function(clubName, universityAt, firstName, lastName, email, callback) {
	var response,
		parameters = {
			clubName: clubName,
			universityAt: universityAt
		},
		query = {
			query : parameters,
			options : {__v : 0}
		};

	crud.read.readByParameter('newClubRequestModel', query, function(data){
		if(!data)
		{
			parameters.leaders = [{firstName : firstName, lastName : lastName, email : email}];
			crud.create.createByParameter('newClubRequestModel', parameters, function(data){
				callback(data);
			});
		}
		else
		{
			callback(null);
		}
	});
};

Club.prototype.removeClub = function(clubName, universityAt, firstName, lastName, email, callback) {
	var response,
		parameters = {
			clubName: clubName,
			universityAt: universityAt
		},
		query = {
			query : parameters,
			options : {__v : 0}
		};
	crud.read.readByParameter('clubModel', query, function(clubs){
		if(clubs)
		{
			parameters.requester = {
				firstName : firstName, 
				lastName : lastName,
				email : email
			};
			crud.create.createByParameter('clubRemovalRequestModel', parameters, function(club){
				if(club)
				{

					response = {
						error : null,
						response : parameters
					};
					callback(response);
				}
				else
				{
					callback(null);
				}
			});
		}
		else
		{
			callback(null);
		}
	});
};


module.exports = new Club();