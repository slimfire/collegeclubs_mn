angular.module('collegeClubs.signup.service', [])
	.service('signupService', function($http){
		var signupService = function(){}

		signupService.prototype.signup = function(credentials){
			return $http.post('/api/signup', credentials);
		};
		return new signupService();
	});