angular.module('collegeClubs.profiles.student', [
	'ui.router',
	'collegeClubs.profiles.student.service'
	])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider){
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
		$stateProvider.state('student', {
			url : '/profiles/student',
			templateUrl : '/app/profiles/student/student.html',
			controller : 'studentCtrl'
		});
	})
	.controller('studentCtrl', function($scope, studentService){
		$scope.studentInfoError = false;
		$scope.getStudentInfo = function(email){
			studentService.getStudentInfo(email)
				.then(function(success){
					if(success.status == 200)
					{
						$scope.studentInfo = success.data;
					}
					else
					{
						$scope.studentInfoError = true;
					}
				}, function(error){
					$scope.studentInfoError = true;
				})
		}
	})