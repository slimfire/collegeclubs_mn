angular.module('collegeClubs.profiles.club.service',[])
	.service('clubService', function($http){
		var News = function(){}
		var Comment = function(){}

		News.prototype.listNews = function(clubName, universityAt){
			return $http.post('/api/club/post/listNews', {
				clubName : clubName,
				universityAt : universityAt
			});
		}

		News.prototype.postNews = function(clubName, universityAt, news, firstName, lastName){
			return $http.post('/api/club/post/postNews', {
				clubName  : clubName,
				universityAt : universityAt,
				news : news,
				firstName : firstName,
				lastName : lastName
			});
		}

		News.prototype.deleteNews = function(postId){
			return $http.post('/api/club/post/deleteNews', { postId : postId });
		}

		Comment.prototype.addComment = function(postId, comment, commenterFirstName, commenterLastName){
			return $http.post('/api/club/post/comment/addComment',{
				postId : postId,
				comment : comment,
				commenterFirstName : commenterFirstName,
				commenterLastName : commenterLastName
			});
		}

		Comment.prototype.editComment = function(postId, commentId, comment){
			return $http.post('/api/club/post/comment/editComment',{
				postId : postId,
				commentId : commentId,
				comment : comment
			});
		}

		Comment.prototype.removeComment = function(postId, commentId){
			return $http.post('/api/club/post/comment/removeComment', {
				postId : postId,
				commentId : commentId
			});
		}

		return {
			news : new News(),
			comment : new Comment()
		};
	})