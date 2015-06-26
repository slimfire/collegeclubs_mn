var mongoose = require('mongoose');
var schema = mongoose.Schema;

var postSchema = new schema({
		universityAt : String,
		clubName : String,
		posterName : {
			firstName : String,
			lastName : String,			
		},
		dateAndTimePosted : Date,
		postBody : {
			content : String,
			comments : [{
				commenterName : {
					firstName : String,
					lastName : String,			
				},
				commentBody : String,
				dateAndTimeCommented : Date,
			}]
		}
	}, {collection: 'posts'});

var postModel = mongoose.model('post', postSchema);

module.exports = postModel;