angular.module('collegeClubs.signin.service', ['ui.router'])
	.factory('signinFactory', function($http){
		var SigninFactory = function(){};

		SigninFactory.prototype.signin = function(email, password, authenticationType){
			var requestParams = {
				secret : null,
				email : null,
				data : {
					email : email,
					password : password,
					authenticationType : authenticationType
				}
			}
			return $http.post('/api/signin', requestParams);
		}
		return new SigninFactory();
	})