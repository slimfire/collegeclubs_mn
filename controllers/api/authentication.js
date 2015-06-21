var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var crud = require('../../models/crud.js');


var Authentication = function(){}

Authentication.prototype.getSigninType = function(userType, callback){
	if(userType == 'student')
	{
		callback('studentModel');
	}
	else if(userType == 'admin')
	{
		callback('adminModel');
	}
}

Authentication.prototype.signin = function(email, password, userType, callback){
	var parameters = {email : email, password : password};
	var response;
	Authentication.prototype.getSigninType(userType, function(modelName){
		crud.read(modelName, parameters, function(data){
			if(!data)
			{
				response = {
					error : 'entered wrong email or password',
					response : {}
				};
				callback(response);
			}
			else if(data.email == email && data.password === password)
			{
				response = {
					error : null,
					response : {
						username : data.username,
						firstName : data.firstName,
						lastName : data.lastName,
						link : data.link,
						phoneNumber : data.phoneNumber,
						university : data.university,
						currentCity : data.currentCity,
						clubsLeading : [data.clubsLeading],
						email : data.email
					}
				};
				callback(response);
			}
		});
	});
}

Authentication.prototype.signup = function(email, password, username, firstName, lastName, university, currentCity, callback){
	var userInfo;
	var parameters = {
		username : username,
		firstName : firstName,
		lastName : lastName,
		university : university,	
		currentCity : currentCity,
		email : email,
		password : password
	};

	crud.read('studentModel', parameters, function(data){
		var response;
		if(!data)
		{
			crud.create('studentModel', parameters , function(data){
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
						clubsLeading : [data.clubsLeading],
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

module.exports = new Authentication();

