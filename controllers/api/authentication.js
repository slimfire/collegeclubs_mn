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
		crud.read.readByParameter(modelName, query, function(account){
			if(!account)
			{
				callback(null);
			}
			else if(account.email == email && account.password === password)
			{
				callback(account);
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

