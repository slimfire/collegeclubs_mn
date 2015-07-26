var crud = require('../../utils/utils.js').crud;

var Student = function(){}

Student.prototype.getStudentsInfo = function(callback){
	var query = {
		query : {},
		options : {password : 0, __v : 0}
	};
	crud.read.readAll('studentModel', query, function(studentsInfo){
		callback(studentsInfo);
	});
}

Student.prototype.getStudentInfo = function(email, callback){
	var query = {
		query : {email : email},
		options : {password : 0, __v : 0}
	};
	crud.read.readByParameter('studentModel', query, function(studentInfo){
		callback(studentInfo);
	});
}

Student.prototype.getStudentsInfoByUniversity = function(university, callback){
	var query = {
		query : {university : university},
		options : {password : 0, __v : 0}
	};
	crud.read.readByParameter('studentModel', query, function(studentsInfo){
		callback(studentsInfo);
	});
}

module.exports = new Student();