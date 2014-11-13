var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect("mongodb://db_username:db_password@ds033699.mongolab.com:33699/heroku_app28027178");

var userSchema = new schema({
	username : String,
	password : String,
	university : String,
	hometown : String	
}, {collection : 'user'});

var user_model = mongoose.model('user', userSchema);

module.exports = user_model;