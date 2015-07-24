var mongoose = require('mongoose');
var schema = mongoose.Schema;

var adminSchema = new schema({
	userType : String,
	key : String,
	email: String,
	password: String},
	{collection: 'admins'}
);


var adminModel = mongoose.model('admins', adminSchema);


module.exports = adminModel;