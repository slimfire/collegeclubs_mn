var crud = require('../../models/crud/crud.js'),
	Token = require('./token.js');

var Request = function(){}

Request.prototype.authenticateRequest = function(email, secret, data, userType, callback){
	var query;
	if(userType == 'student')
	{
		query = {
			query : {email : email},
			options : {__v : 0, password : 0}
		};
		crud.read.readByParameter('studentModel', query, function(account){
			if(account)
			{
				if(Token.hash(account.key + data) == secret)
				{
					account.key = null;
					callback(account);	
				}
				else
				{
					callback(null);
				}
			}
			else
			{
				callback(null);
			}
		});
	}
	else if(userType == 'admin')
	{
		query = {
			query : {email : email},
			options : {__v : 0, password : 0}
		};
		crud.read.readByParameter('adminModel', query, function(account){
			if(account)
			{
				if(Token.hash(account.key + data) == secret)
				{
					callback(account.email);	
				}
				else
				{
					callback(null);
				}
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
}

module.exports = new Request();
