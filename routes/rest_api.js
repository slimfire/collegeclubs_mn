var user_model = require('../models/user_model.js');

//ReST API
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
				return(res.send("Entered username is already taked. Please try anotherone!"));
			}
		}
	});
}