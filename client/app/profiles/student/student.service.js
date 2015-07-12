angular.module('collegeClubs.profiles.student.service', [])
	.service('studentService', function($http){
		var studentService = function(){}

		studentService.prototype.getStudentInfo = function(email){
			return $http.post('/api/student/getStudentInfo',{
				email : email
			});
		}

		studentService.prototype.getSimilarClubs = function(email, club){
			return $http.post('/api/club/getSimilarClubs', {
				clubName : club
			});
		}
		
		return new studentService();
	});