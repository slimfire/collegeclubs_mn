var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var crud = require('../../models/crud/crud.js');
var Student = require('./student.js');

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
	var response,
		parameters = {email : email, password : password},
		query = {
			query : parameters,
			options : {__v : 0}
		}
	Authentication.prototype.getSigninType(userType, function(modelName){
		crud.read.readByParameter(modelName, query, function(data){
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
						clubsLeading : data.clubsLeading,
						email : data.email
					}
				};
				callback(response);
			}
		});
	});
}

Authentication.prototype.signup = function(credentials, callback){
	Student.createAccount(credentials.email, credentials.password, credentials.username, credentials.firstName, credentials.lastName, credentials.university, credentials.currentCity, function(response){
		callback(response);
	});
}

module.exports = new Authentication();

