angular.module('collegeClubs.profiles.student', [
	'ui.router',
	'collegeClubs.profiles.student.service'
	])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider){
		$stateProvider.state('studentProfile', {
			url : '/profiles/student',
			templateUrl : '/app/profiles/student/student.html',
			controller : 'studentCtrl',
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
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	})
	.controller('studentCtrl', function($scope, $stateParams, studentService){
		$scope.response = {
			success : {},
			inputError : {},
			serviceError : {}
		};
		var errorResponse = {
			status : 500,
			message : 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!',
			data : null
		};
		console.log($stateParams);
		$scope.getStudentInfo = function(){
			studentService.getStudentInfo($stateParams.email)
				.then(function(success){
					if(success.data.status == 200)
					{
						$scope.response.success.getStudentInfo = success.data.data;
					}
					else
					{
						$scope.response.inputError.getStudentInfo = success.data.message;	
					}
				}, function(error){
					$scope.response.serviceError.getStudentInfo = error;
				})
		}

		$scope.getSimilarClubs = function(){
			$scope.response.success.getSimilarClubs = [];
			$scope.response.inputError.getSimilarClubs = [];
			$scope.response.serviceError.getSimilarClubs = [];
			for(var club = 0; club < $stateParams.clubs; club++)
			{
				studentService.getSimilarClubs($stateParams.email, club)
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
						$scope.response.serviceError.getSimilarClubs.push(errorResponse.message);
					});
			}
		}
	})