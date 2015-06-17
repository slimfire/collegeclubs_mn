var mongoose = require('mongoose');
var schema = mongoose.Schema;

var newClubRequestSchema = new schema({
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
}, {collection: 'newClubRequests'});


var newClubRequestModel = mongoose.model('newClubRequest', newClubRequestSchema);

module.exports = newClubRequestModel;