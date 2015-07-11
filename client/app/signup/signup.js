angular.module('collegeClubs.signup', [
	'ui.router',
	'collegeClubs.signup.service'
	])
	.config(function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/signup');
		$stateProvider.state('signup', {
			url : '/signup',
			templateUrl : '/app/signup/signup.html',
			controller : 'signupCtrl'
		});
	})
	.controller('signupCtrl', function($state, $scope, signupService){
		var credentials;
		$scope.signup = function(email, password, repeatePassword, username, firstName, lastName, university){
			if(password == repeatePassword)
			{
				credentials = {
					email : email, 
					password : password, 
					username : username, 
					firstName : firstName, 
					lastName : lastName, 
					university : university
				};
				signupService.signup(credentials)
					.then(function(success){
						console.log(success);
						$signupResponse = success;
					}, function(error){
						console.log('Error : ', error);
						$signupResponse = error;
					});
			}
			else
			{
				$scope.signupResponse = {
					status : 500,
					message : 'Entered password doesn\'t match repeated password.Please verify your password again.',
					data : {}
				};  
			}
		}
	});