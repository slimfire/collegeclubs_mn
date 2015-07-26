var crud = require('../utils/utils.js').crud;
var Student = require('./student.js');
var Utils = require('../utils/utils.js');

var Authentication = function(){}

Authentication.prototype.signin = function(email, password, userType, callback){
	var query = {
			query : {email : email, password : password},
			options : {__v : 0}
		};
	modelName = Utils.signinType.getSigninType(userType);
	crud.read.readByParameter(modelName, query, function(account){
		if(!account)
		{
			callback(null);
		}
		else if(account.email == email && account.password === password)
		{
			account.password = null;
			callback(account);
		}
	});
}

Authentication.prototype.signup = function(credentials, callback){
	Student.createAccount(credentials.email, credentials.password, credentials.username, credentials.firstName, credentials.lastName, credentials.university, credentials.currentCity, function(response){
		callback(response);
	});
}

module.exports = new Authentication();

