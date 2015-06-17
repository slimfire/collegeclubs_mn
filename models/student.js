var mongoose = require('mongoose');
var schema = mongoose.Schema;


var studentSchema = new schema({
	id : Number,
	username : String,
	firstName : String,
	lastName : String,
	link : String,
	phoneNumber : Number,
	university : String,
	currentCity : String,
	clubsLeading : [String],
	email : String,
	password : String	
}, {collection : 'students'});

var studentModel = mongoose.model('user', studentSchema);

module.exports = studentModel;