var crud = require('../../models/crud/crud.js');

var Post = function(){}

Post.prototype.postNews = function(clubName, universityAt, news, firstName, lastName, callback){
	var response;
	crud.read.readByParameter('clubModel', {clubName : clubName}, function(response){
		if(response)
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
			console.log(parameters);
			crud.create.createByParameter('postModel', parameters, function(data){
				response = {
					error : null,
					response : data
				}
				callback(response);
			});
		}
		else
		{
			response = {
				error : 'club profile you are trying to post on does not exist',
				response : {}
			};
			callback(response);
		}
	});
}

Post.prototype.deleteNews = function(postId, callback){
	crud.delete.deleteByParameter('postModel', {_id : postId}, function(response){
		if(response)
		{
			callback({status : 200});
		}
		else
		{
			callback({status : 500});
		}

	});
}

module.exports = new post();