angular.module('collegeClubs.profile.student.service', [])
	.service('studentService', function($http){
		var studentService = function(){}

		studentService.prototype.getStudentInfo = function(email){
			return $http.post('/api/student/getStudentInfo',{
				email : email
			});
		}

		studentService.prototype.getSimilarClubs = function(email, club){
			studentService.prototype.getStudentInfo(email)
				.then(function(success){
					if(success.status == 200)
					{
						return $http.post('/api/club/getSimilarClubs', {
							clubName : club
						});
					}
					else
					{
						return success.message;
					}
				}, function(error){
					return "Error : Could not fetch data from api endpoint.";
				});
		}
		return new studentService();
	});