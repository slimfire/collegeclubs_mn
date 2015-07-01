var Admin = require('./admin.js'),
	Search = require('./search/search.js'),
	Authentication = require('./authentication.js'),
	Club = require('./club.js'),
	Comment = require('./comment.js'),
	Post = require('./post.js'),
	Student = require('./student.js');

module.exports = {
	admin : Admin,
	search : Search,
	authentication : Authentication,
	club : Club,
	comment : Comment,
	post : Post,
	student : Student
};