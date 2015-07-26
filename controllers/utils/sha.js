var crypto = require('crypto'),
		crud = require('./crud/crud.js');

var Sha = function(){}

Sha.prototype.hash = function(string){
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

module.exports = new Sha();