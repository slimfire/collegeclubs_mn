var mongoose = require('mongoose');
var schema = mongoose.Schema;

var comment = new schema({
				commenterName : {
					firstName : String,
					lastName : String,			
				},
				commentBody : String,
				dateAndTimeCommented : Date,
			});

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
			comments : [comment]
		}
	}, {collection: 'posts'});

var postModel = mongoose.model('post', postSchema);

module.exports = postModel;