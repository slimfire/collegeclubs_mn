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
	.controller('studentCtrl', function($scope, $stateParams, $cookieStore, studentService){
		$scope.response = {
			getStudentInfoResponse : {
				error : false,
				data : {}
				message : null
			},
			getSimilarClubsResponse : {
				error : false,
				data : {}
				message : null
			}
		};
		var key = $cookieStore.get('collegeClubsKey'),
			email = $cookieStore.get('collegeClubsEmail'),
			errorResponse = {
				status : 500,
				message : 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!',
				data : null
			};
		$scope.getStudentInfo = function(){
			if(!key || !email)
			{
				$state.go('signin');
			}
			studentService.getStudentInfo(email, key)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.getStudentInfoResponse.data = success.data.data;
						$scope.response.getStudentInfoResponse.message = success.data.message;
					}
					else
					{
						$scope.response.getStudentInfoResponse.error = true;
						$scope.response.getStudentInfoResponse.message = success.data.message;
					}
				}, function(error){
						$scope.response.getStudentInfoResponse.error = true;
						$scope.response.getStudentInfoResponse.message = success.data.message;
				});
		}

		$scope.getSimilarClubs = function(){
			if(!key || !email)
			{
				$state.go('signin');
			}
			studentService.getSimilarClubs(email, club, key)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.getSimilarClubs.push(success.data.data);
					}
					else
					{
						$scope.response.inputError.getSimilarClubs.push(success.data.message);	
					}
				}, function(error){
					console.log("error", error)
					$scope.response.serviceError.getSimilarClubs.push(errorResponse.message);
				});
		}
	})