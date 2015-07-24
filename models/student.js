var mongoose = require('mongoose');
var schema = mongoose.Schema;


var studentSchema = new schema({
	userType : String,
	key : String,
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

var studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;