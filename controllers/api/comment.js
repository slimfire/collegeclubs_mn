var crud = require('../../models/crud/crud.js');

var Comment = function(){}

Comment.prototype.addComment = function(postId, comment, commenterFirstName, commenterLastName, callback) {
	var comment = {
		commenterName : {
			firstName : commenterFirstName,
			lastName : commenterLastName,			
		},
		commentBody : comment,
		dateAndTimeCommented : new Date().toString()
	};
	crud.update.pushToSubDocument('postModel', {_id : postId}, {'postBody.comments' : comment }, function(comment){
		callback(comment);
	});
};

Comment.prototype.removeComment = function(postId, commentId, callback) {
	crud.read.readByParameter('postModel', {_id : postId}, function(post){
		var doc = post.postBody.comments.id(commentId).remove();
		post.save(function(err){
			callback({status : 200});
		});
	});
};

module.exports = new Comment();

		