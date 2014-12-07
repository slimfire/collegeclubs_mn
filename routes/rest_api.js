var models = require('../models/user_model.js');
var user_model = models.user_model;
var club_model = models.club_model;
var app = require('../app.js');

//APIs
exports.getUsersResponseHandler= function(req, res){
	user_model.find({},{_id:0, password:0, __v:0},
			function(err, user)
			{
				if(err)
				{
					throw err;
				}
				else
				{
					return(res.json(user));
				}
			}
		);
}

exports.getUserByEmailAddressResponseHandler = function(req, res){
	user_model.findOne({email: req.param('user_email')}, {_id:0, __v:0, password:0}, function(err, user){
		if(err)
		{
			throw err;
		}
		else if(user != null)
		{
			return(res.json(user));
		}
		else
		{
			return(res.send('Sorry, No user found by the entered email address!'));
		}
	});
}

exports.postUserResponseHandler = function(req, res){
	user_model.findOne({email: req.body.email}, function(err, user){
		if(err)
		{
			throw err;
		}
		else
		{
			if(user == null)
			{
				var newUser = new user_model({
								"username" : req.body.username,
								"firstName" : req.body.firstName,
								"lastName" : req.body.lastName,
								"university" : req.body.university,	
								"email" : req.body.email,
								"hometown" : req.body.hometown,
								"password" : req.body.password});
				newUser.save(function(err){
					if(err)
						{
							throw err;
						}
				});
				return (res.send('New user added!'));
			}
			if(user.email == req.body.email)
			{
				return(res.send("Entered e-mail address is already linked with a college clubs accout!"));
			}
		}
	});
}

exports.updateUsername = function(req, res){
		if(app.isSignedIn == true)
		{
			user_model.findOne({username: app.username, email: app.email}, function(err, user){
				if(user != null)
				{
					user_model.where({username: user.username}).setOptions({overwrite: true})
						.update({$set: {username: req.body.newUsername}}, function(err){
							if(err)
							{
								throw err;
							}
							else
							{
								return (res.send('User updated'));
							}
					});
				}
				else
				{
					return (res.send("Failed to change username. Entered username does not exists!"));
				}
			});
		}
		else
		{
			return (res.send('Sorry, you are not signed in to change username!'));
		}
}

exports.delete_user = function(req, res){
		user_model.findOne({email: req.body.email}, function(err, user){
			if(err)
			{
				throw err;
			}
			if(user != null)
			{
				user.remove();
				return(res.send('user Deleted :) !'));
			}
			if(user = null)
			{
				return(res.send('user does not exist! :('));
			}
		});
}
