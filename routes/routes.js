var user_model = require('../models/user_model.js');
var serialized_user = require('../app.js');

exports.indexResponseHandler = function (req, res){
	res.render('index', {title: "College Clubs MN", isSignedIn: false});
}

exports.signinResponseHandler = function (req, res){
	res.render('signin');
}

exports.signupResponseHandler = function(req, res){
	res.render('signup');
}

exports.userProfileResponseHandler = function(req, res){
	res.render('user_profile',{
		username: serialized_user.username,
		university: serialized_user.university,
		hometown: serialized_user.hometown,
		isSignedIn: true
	});
}

exports.signinErrorResponseHandler = function(req, res){
	res.render('signin',{error_message: "The entered username and password does not match. Please try again."})
}

exports.signupErrorResponseHandler = function(req, res){
	res.render('signup',{error_message: 'The entered username already exists. Please try again.'})
}
