angular.module('collegeClubs.home', ['ui.router'])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider){
		$stateProvider.state('home',{
			url : '/',
			templateUrl : '/app/home/home.html'
		});
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	})
