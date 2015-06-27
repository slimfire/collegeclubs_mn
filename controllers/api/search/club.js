var crud = require('../../../models/crud/crud.js');

var Club = function(){}

Club.prototype.getClubsInfo = function(callback){
	var query = {
		query : {},
		options : {__v : 0}
	};
	crud.read.readByParameter('clubModel', query , function(clubsInfo){
		callback(clubsInfo);
	});
}

Club.prototype.getClubInfo = function(club, universityAt, callback){
	var query = {
		query : {universityAt : universityAt},
		options : {__v : 0}
	};
	crud.read.readByParameter('clubModel', query, function(clubInfo){
		callback(clubInfo);
	});
}

module.exports = new Club();