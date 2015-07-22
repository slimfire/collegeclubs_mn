angular.module('collegeClubs.profiles.student.service', [
	'collegeClubs.util.hashes.factory'
	])
	.service('studentService', function($http, hashesFactory){
		var studentService = function(){}

		studentService.prototype.getStudentInfo = function(email, key){
			var data = { email : email };
			var secret = hashesFactory.sha256(key + JSON.stringify(data));
			var requestParams = {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			};
			return $http.post('/api/student/getStudentInfo',requestParams)
		}

		studentService.prototype.getSimilarClubs = function(email, clubName, key){
			var data = { email : email, clubName : clubName };
			var secret = hashesFactory.sha256(key + JSON.stringify(data));
			var requestParams = {
				userType : 'student',
				secret : secret,
				email : email,
				data : data
			};
			return $http.post('/api/club/getSimilarClubs', requestParams);
		}
		
		return new studentService();
	});