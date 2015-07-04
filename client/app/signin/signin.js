angular.module('collegeClubs.signin', ['ui.router', 'collegeClubs.signin.service'])
	.config(function($stateProvider){
		$stateProvider.state('collegeClubs.signin', {
			url : '/signin',
			templateUrl : '/app/signin/signin.html',
			controller : 'signinCtrl'
		})
	})
	.controller('signinCtrl', function($scope, signinFactory){
		console.log('signinCtrl');
		$scope.signin = function(email, password, authenticationType){
			signinFactory.signin(email, password, authenticationType)
				.then(function(success){
					$scope.signinResponse = success;
				}, function(error){
					$scope.signinResponse = error;
				});
		}
	})