angular.module('collegeClubs.signin.service', ['ui.router'])
	.factory('signinFactory', function($http){
		var SigninFactory = function(){};

		SigninFactory.prototype.signin = function(email, password, authenticationType){
			return $http.post('/api/signin', {
				email : email,
				password : password,
				authenticationType : authenticationType
			});
		}
		return new SigninFactory();
	})