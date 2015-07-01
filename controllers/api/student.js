var crud = require('../../models/crud/crud.js');

var Student = function(){}

Student.prototype.createAccount = function(email, password, username, firstName, lastName, university, currentCity, callback){
	var userInfo;
	var query = {
		query : {
			username : username,
			firstName : firstName,
			lastName : lastName,
			university : university,	
			currentCity : currentCity,
			email : email,
			password : password
		},
		options : {__v : 0}
	};

	crud.read.readByParameter('studentModel', query, function(data){
		var response;
		if(!data)
		{
			query.query.link = null;
			query.query.phoneNumber = null;
			crud.create.createByParameter('studentModel', query.query , function(data){
				response = {
					error : null,
					response : {
						username : data.username,
						firstName : firstName,
						lastName : data.lastName,
						link : data.link,
						phoneNumber : data.phoneNumber,
						university : data.university,
						currentCity : data.currentCity,
						clubsLeading : data.clubsLeading,
						email : data.email
					}
				};
				callback(response);
			});	
		}
		else
		{
			response = {
				error : 'email already exists',
				response : {}
			};
			callback(response);
		}
	});
}

Student.prototype.updateAccountInfo = function(id, update, callback){
	crud.update.replaceDocument('studentModel', {_id : id}, update, function(upToDateAccountInfo){
		callback(upToDateAccountInfo);
	});
}

Student.prototype.deleteAccount = function(email, callback){
	var query = {
		query : {email : email},
		options : {email : email}
	};
	crud.read.readByParameter('studentModel', query, function(accountInfo){
		if(accountInfo)
		{
			crud.delete.deleteByParameter('studentModel', {email : email}, function(response){
				callback({status : 200, error : null});
			});
		}
		else
		{
			callback({status : 500, error : 'Couldn\'t find account. Sorry Try again!'});
		}
	});
}

module.exports = new Student();