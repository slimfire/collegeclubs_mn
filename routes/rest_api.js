var user_model = require('../models/user_model.js');
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
						res.json(user);
					}
				}
			);
	};

exports.postUserResponseHandler = function(req, res){
	user_model.findOne({username: req.body.username}, function(err, user){
		if(err)
		{
			throw err;
		}
		else
		{
			if(user == null)
			{
				var newUser = new user_model({"username": req.body.username,
								"password": req.body.password,
								"university": req.body.university,
								"hometown": req.body.hometown});
				newUser.save(function(err){
					if(err)
						{
							throw err;
						}
				});
				return (res.send('New user added!'));
			}
			if(user.username == req.body.username)
			{
				return(res.send("Entered username is already taken. Please try anotherone!"));
			}
		}
	});
}

exports.updateUsername = function(req, res){
		if(app.isSignedIn == true)
		{
			user_model.findOne({username: req.body.username}, function(err, user){
				if(user != null)
				{
					user_model.where({username: req.body.username}).setOptions({overwrite: true})
						.update({$set: {username: req.body.newUsername}}, function(err){
							if(err)
							{
								throw err;
							}
							else
							{
								res.send('User updated');
							}
					});
				}
				else
				{
					res.send("Failed to change username. Entered username does not exists!")
				}
			});
		}
		else
		{
			res.send('Sorry, you are not signed in to change username!')
		}
}