angular.module('collegeClubs.profiles.club',[
	'collegeClubs.profiles.club.service',
	'collegeClubs.profiles.student.service',
	'ui.router'
	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider.state('clubProfile', {
			url : '/profiles/club',
			templateUrl : '/app/profiles/club/club.html',
			controller : 'clubCtrl'
		});
	})
	.controller('clubCtrl',function($scope, $cookieStore, clubService, studentService){
		var key = $cookieStore.get('collegeClubsKey'),
			email = $cookieStore.get('collegeClubsEmail'),
			userType = $cookieStore.get('collegeClubsUserType'),
			serviceErrorMessage = 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!';
		if(!key || !email || !userType)
		{
			$state.go('signin');
		}
		var responseObjects = ['listNewsResponse', 'postNewsResponse', 'deleteNewsResponse', 'addCommentResponse', 'editCommentResponse', 'removeCommentResponse'];
		$scope.response = {};
		for(var i = 0; i < responseObjects.length; i++)
		{
			$scope.response[responseObjects[i]] = {
				error : false,
				data : {},
				message : null
			}
		}
		$scope.hey = function($event){
			console.log($event.target.parentNode.id);
		}
		$scope.listNews = function(){
			studentService.getStudentInfo(email, key, userType)
				.then(function(response){
					var club = response.data.data.response.clubsLeading[0],
							universityAt = response.data.data.response.university;
					clubService.news.listNews(club, universityAt, userType, email, key)
						.then(function(response){
							if(response.data.status == 200)
							{
								$scope.response.listNewsResponse.data = response.data.data.response;
								console.log("listNews : ", $scope.response.listNewsResponse.data)
							}
							else if(response.data.status == 500)
							{
								$scope.response.listNewsResponse.error = true;
								$scope.response.listNewsResponse.message = response.data.message;
							}
						}, function(error){
							console.log(error);
							$scope.response.listNewsResponse.error = true;
							$scope.response.listNewsResponse.message = serviceErrorMessage;
						})	
				}, function(error){
					$scope.response.listNewsResponse.error = true;
					$scope.response.listNewsResponse.message = serviceErrorMessage;
				})
		}

		$scope.postNews = function(clubName, universityAt, news, firstName, lastName){
			clubService.news.postNews(clubName, universityAt, news, firstName, lastName, userType, email, key)
				.then(function(response){
					if(response.data.status == 200)
					{
						$scope.response.postNewsResponse.data = response.data.data;
					}
					else if(response.data.status == 500)
					{
						$scope.response.listNewsResponse.error = true;
						$scope.response.postNewsResponse.message = response.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.listNewsResponse.error = true;
					$scope.response.postNewsResponse.message = serviceErrorMessage;
				})
		}

		$scope.deleteNews = function(postId){
			clubService.news.deleteNews(postId, userType, email, key)
				.then(function(response){
					if(response.data.status == 200)
					{
						$scope.response.deleteNewsResponse.deleteNews = response.data.data;
					}
					else if(response.data.status == 500)
					{
						$scope.response.listNewsResponse.error = true;
						$scope.response.deleteNewsResponse.message = response.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.listNewsResponse.error = true;
					$scope.response.deleteNewsResponse.message = serviceErrorMessage;
				})
		}

		$scope.addComment = function(postId, comment, commenterFirstName, commenterLastName){
			clubService.comment.addComment(postId, userType, email, key)
				.then(function(response){
					if(success.data.status == 200)
					{
						$scope.response.addCommentResponse.data = response.data.data;
					}
					else if(response.data.status == 500)
					{
						$scope.response.listNewsResponse.error = true;
						$scope.response.addCommentResponse.message = response.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.listNewsResponse.error = true;
					$scope.response.addCommentResponse.message = serviceErrorMessage;
				})
		}

		$scope.editComment = function(postId, commentId, comment){
			clubService.comment.editComment(postId, userType, email, key)
				.then(function(response){
					if(success.data.status == 200)
					{
						$scope.response.editCommentResponse.data = response.data.data;
					}
					else if(response.data.status == 500)
					{
						$scope.response.listNewsResponse.error = true;
						$scope.response.editCommentResponse.message = response.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.listNewsResponse.error = true;
					$scope.response.editCommentResponse.message = serviceErrorMessage;
				})
		}

		$scope.removeComment = function(postId, commentId){
			clubService.comment.removeComment(postId, userType, email, key)
				.then(function(response){
					if(response.data.status == 200)
					{
						$scope.response.removeCommentResponse.data = response.data.data;
					}
					else if(response.data.status == 500)
					{
						$scope.response.listNewsResponse.error = true;
						$scope.response.removeCommentResponse.message = response.data.message;
					}
				}, function(error){
					console.log(error);
					$scope.response.removeCommentResponse.error = true;
					$scope.response.removeCommentResponse.message = serviceErrorMessage;
				})
		}
	});