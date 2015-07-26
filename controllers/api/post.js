var crud = require('../utils/utils.js').crud;

var Post = function(){}

Post.prototype.ListNews = function(clubName, universityAt, callback){
	var query = {
		query : {
			clubName : clubName,
			universityAt : universityAt
		},
		options : { __v : 0 }
	};
	crud.read.readAll('postModel', query, function(posts){
		callback(posts);
	});
}

Post.prototype.postNews = function(clubName, universityAt, news, firstName, lastName, callback){
	var query = {
			query : {clubName : clubName},
			options : {__v : 0}
		};
	crud.read.readByParameter('clubModel', query, function(club){
		if(club)
		{
			var parameters = {
				clubName : clubName,
				universityAt : universityAt,
				posterName :{
					firstName : firstName,
					lastName : lastName
				},
				dateAndTimePosted : new Date().toLocaleString(),
				postBody : {
									content : news,
									comments : []
								},
				posterName : {
					firstName : firstName,
					lastName : lastName
				}
			};
			crud.create.createByParameter('postModel', parameters, function(post){
				callback(post);
			});
		}
		else
		{
			callback(null);
		}
	});
}

Post.prototype.deleteNews = function(postId, callback){
	crud.delete.deleteByParameter('postModel', {_id : postId}, function(post){
		if(post)
		{
			callback(post);
		}
		else
		{
			callback(null);
		}

	});
}

module.exports = new Post();