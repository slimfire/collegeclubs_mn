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
	.controller('studentCtrl', function($scope, $stateParams, studentService){
		var errorResponse = {
			status : 500,
			message : 'Sorry, something went wrong. Our Engineers has been notified and the service would be available soon. Please try again!',
			data : null
		};
		console.log("email ",$stateParams);
		$scope.getStudentInfo = function(){
			studentService.getStudentInfo($stateParams.email)
				.then(function(success){
					$scope.studentInfo = success.data;
				}, function(error){
					$scope.studentInfo = errorResponse;
				})
		}

		$scope.getSimilarClubs = function(){
			$scope.similarClubs = [];
			for(var club = 0; club < $stateParams.clubs; club++)
			{
				studentService.getSimilarClubs($stateParams.email, club)
					.then(function(success){
						$scope.similarClubs.push(success.data);
					}, function(error){
						$scope.similarClubs.push(errorResponse);
					});
			}
		}
	})