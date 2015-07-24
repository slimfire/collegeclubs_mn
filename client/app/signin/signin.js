angular.module('collegeClubs.signin', [
		'ui.router',
		'collegeClubs.signin.service'
	])
	.config(function($stateProvider, $locationProvider, $urlRouterProvider){
		$stateProvider.state('signin', {
			url : '/signin',
			templateUrl : '/app/signin/signin.html',
			controller : 'signinCtrl'
		});
		$urlRouterProvider.otherwise('/signin');
		$locationProvider.html5Mode(true);
	})
	.controller('signinCtrl', function($scope, signinFactory, $state, $cookieStore){
		$scope.signin = function(email, password, authenticationType){
			$scope.signinResponse = {
				error : false,
				data : {},
				message : null
			};
			signinFactory.signin(email, password, authenticationType)
				.then(function(success){
					if(success.data.status == 200)
					{
						$cookieStore.put('collegeClubsKey', success.data.data.userInfo.key);
						$cookieStore.put('collegeClubsEmail', success.data.data.userInfo.email);
						$cookieStore.put('collegeClubsUserType', success.data.data.userInfo.userType);
						$state.go('studentProfile');
					}
					else if(success.data.status == 500)
					{
						$scope.signinResponse = {
							error : true,
							data : {},
							message : success.data.message
						};
					}
					
				}, function(error){
					console.log('error : ', error);
						$scope.signinResponse = {
							error : true,
							data : {},
							message : 'Oops, something went wrong :( . Please try again !'
						};
				});
		}
	})