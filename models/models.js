var mongoose = require('mongoose'),
	schema = mongoose.Schema;

mongoose.connect("mongodb://db_username:db_password@ds051750.mongolab.com:51750/heroku_app31755176");

var clubModel = require('./club.js'),
	adminModel = require('./admin.js'),
	studentModel = require('./student.js'),
	newClubRequestModel = require('./newClubRequest.js');

module.exports = {
	clubModel : clubModel,
	adminModel : adminModel,
	studentModel : studentModel,
	newClubRequestModel : newClubRequestModel
};