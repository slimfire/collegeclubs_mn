var crud = require('../../models/crud/crud.js');

var Student = function(){}

Student.prototype.getAccountInfo = function(email, callback){
	crud.read.readByParameter('studentModel', {email : email}, function(accountInfo){
		accountInfo.password = accountInfo.password.length;
		callback(accountInfo);
	});
}

Student.prototype.updateAccountInfo = function(id, update, callback){
	crud.update.replaceDocument('studentModel', {_id : id}, update, function(upToDateAccountInfo){
		callback(upToDateAccountInfo);
	});
}

Student.prototype.deleteAccount = function(email, callback){
	crud.read.readByParameter('studentModel', {email : email}, function(accountInfo){
		if(accountInfo)
		{
			crud.delete.deleteByParameter('studentModel', {email : email}, function(response){
				callback(response);
			});
		}
	});
}

module.exports = new Student();