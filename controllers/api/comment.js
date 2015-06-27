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
	var query = {
		query : {_id : postId},
		options : {__v : 0}
	};
	crud.read.readByParameter('postModel', query, function(post){
		var doc = post.postBody.comments.id(commentId).remove();
		post.save(function(err){
			callback({status : 200});
		});
	});
};

Comment.prototype.editComment = function(postId, commentId, comment, callback) {
	var comments,
		query = {
			query : {_id : postId},
			options : {__v : 0}
		};
	crud.read.readByParameter('postModel', query, function(post){
		var doc = post.postBody.comments.id(commentId);
		doc.commentBody = comment;
		post.save(function(doc){
			callback({status : 200});
		});
	});
};

module.exports = new Comment();

		