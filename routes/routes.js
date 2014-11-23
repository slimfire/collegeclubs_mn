var user_model = require('../models/user_model.js');
var app = require('../app.js');


exports.indexResponseHandler = function (req, res){
	res.render('index', {title: "College Clubs MN", isSignedIn: app.isSignedIn, username : app.username});
}

exports.signinResponseHandler = function (req, res){
	res.render('signin');
}

exports.signupResponseHandler = function(req, res){
	res.render('signup');
}

exports.userProfileResponseHandler = function(req, res){
	if(app.isSignedIn == true)
	{
		res.render('user_profile',{
			username: app.username,
			university: app.university,
			hometown: app.hometown
		});
	}
	else
	{
		res.send('The page you are trying to access is not available!');
	}
}

exports.signinErrorResponseHandler = function(req, res){
	res.render('signin',{error_message: "The entered username and password does not match. Please try again."})
}

exports.signupErrorResponseHandler = function(req, res){
	res.render('signup',{error_message: 'The entered username already exists. Please try again.'})
}
