angular.module('collegeClubs.signin', ['ui.router', 'collegeClubs.signin.service'])
	.config(function($stateProvider, $locationProvider, $urlRouterProvider){
		$stateProvider.state('signin', {
			url : '/signin',
			templateUrl : '/app/signin/signin.html',
			controller : 'signinCtrl'
		});
		$urlRouterProvider.otherwise('/signin');
		$locationProvider.html5Mode(true);
	})
	.controller('signinCtrl', function($scope, signinFactory, $state){
		$scope.signin = function(email, password, authenticationType){
			signinFactory.signin(email, password, authenticationType)
				.then(function(response){
					if(response.data.status == 200)
					{
						$scope.signinResponse = response.data.message;
						$state.go('studentProfile', response.data.data);
					}
					else if(response.data.status == 500)
					{
						$scope.signinResponse = response.data.message;
					}
					
				}, function(error){
					console.log('error : ', error);
					$scope.signinResponse = error;
				});
		}
	})