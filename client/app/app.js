angular.module('collegeClubs', [
	'collegeClubs.signin',
	'ngMaterial',
	'ui.router'
	])
	.config(function($stateProvider){
		$stateProvider.state('collegeClubs', {
			url : '/',
			templateUrl : 'index.html'
		})
	})
