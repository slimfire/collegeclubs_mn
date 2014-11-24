var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect("mongodb://db_username:db_password@ds033699.mongolab.com:33699/heroku_app28027178");

var userSchema = new schema({
	username : String,
	firstName : String,
	lastName : String,
	university : String,	
	email : String,
	hometown : String,
	password : String	
}, {collection : 'user'});

var user_model = mongoose.model('user', userSchema);

module.exports = user_model;