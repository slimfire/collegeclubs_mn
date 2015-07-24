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
	.controller('signupCtrl', function($state, $scope, $cookieStore, signupService){
		var params;
		$scope.signup = function(email, password, repeatePassword, username, firstName, lastName, university){
			$scope.signupResponse = {
				error : false,
				message : null,
				data : null
			}
			if(password == repeatePassword)
			{
				params = {
					secret : null,
					authEmail : null,
					data : {
						email : email, 
						password : password, 
						username : username, 
						firstName : firstName, 
						lastName : lastName, 
						university : university
					}
				};
				signupService.signup(params)
					.then(function(success){
						if(success.data.status == 200)
						{
							$cookieStore.put('collegeClubsKey', success.data.data.userInfo.key);
							$cookieStore.put('collegeClubsEmail', success.data.data.userInfo.email);
							$cookieStore.put('collegeClubsUserType', success.data.data.userInfo.userType);
							$state.go('studentProfile');
						}
						else
						{
							$scope.signupResponse = {
								error : true,
								data : {},
								message : success.data.message
							};
						}
					}, function(error){
						console.log('Error : ', error);
						$scope.signupResponse = {
							error : true,
							data : {},
							message : 'Oops, something went wrong :( . Please try again !'
						};
					});
			}
			else
			{
				$scope.signupResponse = {
					error : true,
					data : {},
					message : 'Entered password doesn\'t match repeated password. Please verify your password again !'
				};  
			}
		}
	});