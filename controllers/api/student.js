var crud = require('../../models/crud/crud.js'),
		Utils = require('../utils/utils.js');

var Student = function(){}

Student.prototype.createAccount = function(email, password, username, firstName, lastName, university, currentCity, callback){
	var userInfo, key,
			query = {
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
	crud.read.readByParameter('studentModel', {query : {email : email}, options : query.options}, function(data){
		if(!data)
		{
			query.query.key = null;
			query.query.link = null;
			query.query.phoneNumber = null;
			crud.create.createByParameter('studentModel', query.query , function(account){
				key = Utils.sha.hash(JSON.stringify(account._id));
				crud.update.replaceDocument('studentModel', {email : account.email}, {key : key}, function(account){
					account.password = null;
					callback(account);
				})
			});	
		}
		else
		{
			callback(null);
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
				callback(response);
			});
		}
		else
		{
			callback(null);
		}
	});
}

module.exports = new Student();