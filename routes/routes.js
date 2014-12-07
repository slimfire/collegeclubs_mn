var models = require('../models/user_model.js');
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
			firstName: app.firstName,
			lastName: app.lastName,
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
	res.render('signin',{error_message: "The entered e-mail address and password does not match. Please try again."})
}

exports.signupErrorResponseHandler = function(req, res){
	res.render('signup',{error_message: 'Sorry, the entered e-mail already in use.'})
}

exports.clubs = function(req, res){
	if(app.isSignedIn == true)
	{
		var clubs = [];
		models.club_model.find({}, {_id:0}, function(err, clubsInfo){
			if(err)
			{
				throw err;
			}
			else
			{
				res.render('clubs', {clubs: clubsInfo, username: app.username});
;			}
		});
	}
	else
	{
		res.send('Sorry, you are not signed in to view available clubs!');
	}
}