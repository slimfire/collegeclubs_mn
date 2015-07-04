angular.module('collegeClubs.signin.service',[])
.factory('signinFactory', function($http){
	var SigninFactory = function(){};

	SigninFactory.prototype.sigin = function(email, password, authenticationType){
		return $http.post('/sigin', {
			email : email,
			password : password,
			authenticationType : authenticationType
		});
	}

	return new SigninFactory();
});