angular.module('collegeClubs.profiles.student', [
	'ui.router',
	'collegeClubs.profiles.student.service'
	])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider){
		$stateProvider.state('studentProfile', {
			url : '/profiles/student',
			templateUrl : '/app/profiles/student/student.html',
			controller : 'studentCtrl'
		});
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	})
	.controller('studentCtrl', function($scope, $state, $cookieStore, studentService){
		$scope.loading = true;
		$scope.response = {
			getStudentInfoResponse : {
				error : false,
				data : {},
				message : null
			},
			getSimilarClubsResponse : {
				error : false,
				data : [],
				messages : []
			}
		};
		var key = $cookieStore.get('collegeClubsKey'),
				email = $cookieStore.get('collegeClubsEmail'),
				userType = $cookieStore.get('collegeClubsUserType'),
				serviceErrorMessage = 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!';
		$scope.getStudentInfo = function(){
			if(!key || !email || !userType)
			{
				$state.go('signin');
			}
			else
			{
				studentService.getStudentInfo(email, key, userType)
					.then(function(success){
						$scope.loading = false;
						if(success.data.status == 200)
						{
							$scope.response.getStudentInfoResponse.data = success.data.data;
							$scope.response.getStudentInfoResponse.message = success.data.message;
							console.log($scope.response.getStudentInfoResponse.data)
						}
						else
						{
							$scope.response.getStudentInfoResponse.error = true;
							$scope.response.getStudentInfoResponse.message = success.data.message;
						}
					}, function(error){
							$scope.response.getStudentInfoResponse.error = true;
							$scope.response.getStudentInfoResponse.message = serviceErrorMessage;
					});
			}
		}
		$scope.getSimilarClubs = function(){
			if(!key || !email || !userType)
			{
				$state.go('signin');
			}
			else
			{
				studentService.getStudentInfo(email, key, userType)
					.then(function(getStudentInfoSuccess){
						if(getStudentInfoSuccess.data.status == 200)
						{
							for(var i = 0; i < getStudentInfoSuccess.data.data.userInfo.clubsLeading.length; i++)
							{
								studentService.getSimilarClubs(email, getStudentInfoSuccess.data.data.userInfo.clubsLeading[i], key, userType)
									.then(function(getSimilarClubsSuccess){
										$scope.loading = false;
										if(getSimilarClubsSuccess.data.status == 200)
										{
											$scope.response.getSimilarClubsResponse.data.push(getSimilarClubsSuccess.data.data.response);
											$scope.response.getSimilarClubsResponse.messages.push(getSimilarClubsSuccess.data.message);
											console.log($scope.response.getSimilarClubsResponse.data);
										}
										else
										{
											$scope.response.getSimilarClubsResponse.error = true;
											$scope.response.getSimilarClubsResponse.messages.push(getSimilarClubsSuccess.data.message);
										}
									},function(getSimilarClubsError){
											$scope.response.getSimilarClubsResponse.error = true;
											$scope.response.getSimilarClubsResponse.messages.push(serviceErrorMessage);
									});
							}
						}
						else
						{
							$scope.response.getStudentInfoResponse.error = true;
							$scope.response.getStudentInfoResponse.messages = serviceErrorMessage;
						}
					}, function(getStudentInfoError){
							$scope.response.getStudentInfoResponse.error = true;
							$scope.response.getStudentInfoResponse.messages = serviceErrorMessage;	
					});
			}
		}
	})