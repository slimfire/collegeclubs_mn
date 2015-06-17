var mongoose = require('mongoose');
var schema = mongoose.Schema;

var clubSchema = new schema({
	clubName: String,
	id : Number,
	leaders : [{firstName : String, lastName : String, email : String}],
	universityAt: String,
	post: {
		id : Number,
		posterName : {
			firstName : String,
			lastName : String,			
		},
		datePosted : new Date().toDateString(),
		timePosted : new Date().toLocaleTimeString(),
		post : {
			content : String,
			comments : [String]
		}
	}
}, {collection: 'clubs'});


var clubModel = mongoose.model('club', clubSchema);

module.exports = clubModel;