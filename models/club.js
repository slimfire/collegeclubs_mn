var mongoose = require('mongoose');
var schema = mongoose.Schema;

var posterName = new schema({
			firstName : String,
			lastName : String,			
		});

var postBody = new schema({
			content : String,
			comments : [String]
		});

var post = new schema({
		id : Number,
		posterName : [posterName],
		datePosted : Date,
		timePosted : Date,
		postBody : [postBody]
	});

var clubSchema = new schema({
	clubName: String,
	id : Number,
	leaders : [{firstName : String, lastName : String, email : String}],
	universityAt: String,
	post: [post]
}, {collection: 'clubs'});


var clubModel = mongoose.model('club', clubSchema);

module.exports = clubModel;