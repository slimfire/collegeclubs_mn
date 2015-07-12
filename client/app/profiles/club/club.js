angular.module('collegeClubs.profiles.club',[
	'collegeClubs.profiles.club.service',
	'ui.router'
	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider.state('clubProfile', {
			url : '/profiles/club',
			templateUrl : '/app/profiles/club/club.html',
			controller : 'clubCtrl',
			params : {
				username : null,
				firstName : null,
				lastName : null,
				link : null,
				phoneNumber : null,
				university : null,
				currentCity : null,
				clubsLeading : null,
				email : null
			}
		});
	})
	.controller('clubCtrl',function($scope, clubService){
		$scope.response = {
			success = {},
			serviceError = {},
			inputError = {}
		};
		var serviceErrorMessage = 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!';

		$scope.listNews = function(clubName, universityAt){
			clubService.news.listNews(clubName, universityAt)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.listNews = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.listNews = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.listNews = serviceErrorMessage;
				})
		}

		$scope.postNews = function(clubName, universityAt, news, firstName, lastName){
			clubService.news.postNews(clubName, universityAt, news, firstName, lastName)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.postNews = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.postNews = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.postNews = serviceErrorMessage;
				})
		}

		$scope.deleteNews = function(postId){
			clubService.news.deleteNews(postId)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.deleteNews = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.deleteNews = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.deleteNews = serviceErrorMessage;
				})
		}

		$scope.addComment = function(postId, comment, commenterFirstName, commenterLastName){
			clubService.comment.addComment(postId)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.addComment = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.addComment = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.addComment = serviceErrorMessage;
				})
		}

		$scope.editComment = function(postId, commentId, comment){
			clubService.comment.editComment(postId)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.editComment = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.editComment = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.editComment = serviceErrorMessage;
				})
		}

		$scope.removeComment = function(postId, commentId){
			clubService.comment.removeComment(postId)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.removeComment = success.data.data;
					}
					else if(success.data.status == 500)
					{
						$scope.response.inputError.removeComment = success.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.serviceError.removeComment = serviceErrorMessage;
				})
		}
	});