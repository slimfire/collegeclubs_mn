var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect("mongodb://db_username:db_password@ds051750.mongolab.com:51750/heroku_app31755176");

var userSchema = new schema({
	username : String,
	firstName : String,
	lastName : String,
	university : String,	
	email : String,
	hometown : String,
	password : String	
}, {collection : 'user'});

var clubSchema = new schema({
	clubName: String,	
	existsAt: [String],
	news: [{clubName : String, studentName: String, content: String}] // [UniversityAt, postedBy, content]
}, {collection: 'clubs'});

var pendingRequestsSchema = new schema({
	clubName: String,
	existsAt: [String],
	news : []
}, {collection: 'pendingRequests'});

var adminSchema = new schema({
	email: String,
	password: String},
	{collection: 'adminstrator'}
);

var club_model = mongoose.model('clubs', clubSchema);
var user_model = mongoose.model('user', userSchema);
var pending_requests_model = mongoose.model('pendingRequests ', pendingRequestsSchema);
var admin_model = mongoose.model('adminstrator', adminSchema);

exports.club_model = club_model;
exports.user_model = user_model;
exports.pending_requests_model = pending_requests_model;
exports.admin_model = admin_model;