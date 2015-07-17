var crypto = require('crypto'),
		crud = require('../../models/crud/crud.js');

var Token = function(){}

Token.prototype.hash = function(string){
	console.log('hashing : ', string, " of type : ", typeof(string))

	if(typeof(string) == 'string')
	{
		var shaString = crypto.createHash('sha256');
		shaString.update(string);
		return shaString.digest('hex');
	}
	else
	{
		return null;
	}
}

module.exports = new Token();