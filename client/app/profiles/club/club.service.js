angular.module('collegeClubs.profiles.club.service',[
		'collegeClubs.util.hashes.factory'
	])
	.service('clubService', function($http, hashesFactory){
		var News = function(){}
		var Comment = function(){}

		News.prototype.listNews = function(clubName, universityAt, userType, email, key){
			var data = {
						clubName : clubName,
						universityAt : universityAt
					},
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/listNews', {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		News.prototype.postNews = function(clubName, universityAt, news, firstName, lastName, userType, email, key){
			var data = {
						clubName  : clubName,
						universityAt : universityAt,
						news : news,
						firstName : firstName,
						lastName : lastName
					},
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/postNews', {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		News.prototype.deleteNews = function(postId, userType, email, key){
			var data = { postId : postId },
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/deleteNews', { 
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		Comment.prototype.addComment = function(postId, comment, commenterFirstName, commenterLastName, userType, email, key){
			var data = {
						postId : postId,
						comment : comment,
						commenterFirstName : commenterFirstName,
						commenterLastName : commenterLastName
					},
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/comment/addComment', {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		Comment.prototype.editComment = function(postId, commentId, comment, userType, email, key){
			var data = {
						postId : postId,
						commentId : commentId,
						comment : comment
					},
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/comment/editComment', {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		Comment.prototype.removeComment = function(postId, commentId, userType, email, key){
			var data = {
						postId : postId,
						commentId : commentId
					},
					secret = hashesFactory.sha256(key + JSON.stringify(data));
			return $http.post('/api/club/post/comment/removeComment', {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			});
		}

		return {
			news : new News(),
			comment : new Comment()
		};
	})