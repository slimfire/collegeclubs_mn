//CRUD Operations

var Create = require('./create.js'),
	Read = require('./read.js'),
	Update = require('./update.js'),
	Delete = require('./delete.js');

module.exports = {
	create : Create,
	read : Read,
	update : Update,
	delete : Delete
};