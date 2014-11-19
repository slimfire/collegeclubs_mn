var user_models = require('../models/user_model.js');

//ReST API
exports.getUsersResponseHandler= function(req, res){
		user_models.find({},{_id:0, password:0, __v:0},
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
