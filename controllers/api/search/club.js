var crud = require('../../../models/crud/crud.js');

var Club = function(){}

Club.prototype.getClubsInfo = function(callback){
	var query = {
		query : {},
		options : {__v : 0}
	};
	crud.read.readAll('clubModel', query, function(clubsInfo){
		callback(clubsInfo);
	});
}

Club.prototype.getClubInfo = function(clubName, universityAt, callback){
	var query = {
		query : {
			clubName : clubName,
			universityAt : universityAt
		},
		options : {__v : 0}
	};
	crud.read.readByParameter('clubModel', query, function(clubInfo){
		callback(clubInfo);
	});
}

Club.prototype.getSimilarClubs = function(clubName, callback){
	var query = {
		query : {clubName : clubName},
		options : {__v : 0}
	};
	crud.read.readAll('clubModel', query, function(clubs){
		callback(clubs);
	});
}
module.exports = new Club();