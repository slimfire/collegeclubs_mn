var models = require('../models/user_model.js');
var app = require('../app.js');
var pending_requests_model = models.pending_requests_model;

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

exports.clubsResponseHandler = function(req, res){
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

exports.settingsResponseHandler = function(req, res){
	if(app.isSignedIn)
	{
		res.render('settings', {
				firstName: app.firstName,
				lastName: app.lastName,
				username: app.username
			});
	}
	else
	{
		res.send("Site unavailable!");
	}
}

exports.addClubResponseHandler = function(req, res){
	if(app.isSignedIn)
	{
		pending_requests_model.findOne({clubName: req.body.clubName}, function(err, requests){
			if(err)
			{
				throw err;
			}
			else
			{
				if(requests == null)
				{
					var request = new pending_requests_model({
							"clubName": req.body.clubName,
							"existsAt": [req.body.universityName]
						});
						request.save(function(err)
							{
								if(err)
								{
									throw err;
								}
							}
						);									
					}
				else
				{
					requests.existsAt.push(req.body.universityName);
				}
			}					
		});
		res.send('Your request have successfully been submitted to the adminstrator and will be posted soon!');
	}
	else
	{
		res.send("Page not available!")
	}
}

exports.adminClubsResponseHandler = function(req, res){
	pending_requests_model.find({}, function(err, requests){
		res.render('clubs', {clubs: requests})
	});
}

exports.adminResponseHandler = function(req, res){
	res.render('admin');
}