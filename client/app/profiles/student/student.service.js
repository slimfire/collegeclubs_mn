angular.module('collegeClubs.profiles.student.service', [
	'collegeClubs.util.hashes.factory'
	])
	.service('studentService', function($http, hashesFactory){
		var studentService = function(){}

		studentService.prototype.getStudentInfo = function(email, key){
			var data = { email : email };
			var secret = hashesFactory.sha256(data.toString() + key);
			var requestParams = {
				secret : secret,
				email : email,
				data : data
			};
			return $http.post('/api/student/getStudentInfo',requestParams);
		}

		studentService.prototype.getSimilarClubs = function(email, club){
			return $http.post('/api/club/getSimilarClubs', {
				clubName : club
			});
		}
		
		return new studentService();
	});