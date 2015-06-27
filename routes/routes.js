
var app = require('../app.js');
var supporting_functions = require('./server_side_supporting_functions.js');


exports.indexResponseHandler = function (req, res){
	res.render('index', {title: "College Clubs MN", isSignedIn: app.isSignedIn, 
													username : app.username,
													isAdmin : app.isAdmin
												});
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
				res.render('clubs', {clubs: clubsInfo, username: app.username, isAdmin: app.isAdmin});
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
				username: app.username,
				isAdmin: app.isAdmin
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
		models.pending_requests_model.findOne({clubName: req.body.clubName}, function(err, queriedData){
			if(err)
			{
				throw err;
			}
			else
			{
				if(queriedData == null)
				{
					var request = new models.pending_requests_model({
							"clubName": req.body.clubName,
							"existsAt": [req.body.universityName],
							"news" : []
						});
						request.save(function(err)
							{
								if(err)
								{
									throw err;
								}
								res.send('Your request have successfully been submitted to the adminstrator and will be posted soon!');
							}
						);									
					}
				else if(queriedData.clubName == req.body.clubName)
				{
					var universities = queriedData.existsAt;
					if(universities.indexOf(req.body.universityName) == -1)
					{
						universities.push(req.body.universityName);
						models.pending_requests_model
							.where({clubName: req.body.clubName})
							.setOptions({overwrite: true})
							.update( {$set : {existsAt: universities}}, function(err){
								if(err)
								{
									throw err;
								}
								res.send('Your request have successfully been submitted to the adminstrator and will be posted soon!');
							});
					}
					else
					{
						res.send('Your request have successfully been submitted to the adminstrator and will be posted soon!');
					}
				}	
			}					
		});
	}
	else
	{
		res.send("Page not available!")
	}
}

exports.adminSignInResponseHandler = function(req, res){
	res.render('signin', {isAdmin: 'true'});
}

exports.adminIndexResponseHandler = function(req, res){
	if(app.isSignedIn)
	{
		res.render('admin', {isAdmin: app.isAdmin});
	}
	else
	{
		res.send('Sorry, Page not available!');
	}
}

exports.clubRequestResponseHandler = function(req, res){
	if(app.isSignedIn)
	{
		models.pending_requests_model.find({},{_id:0, __v:0}, function(err, clubs){
			if(err)
			{
				throw err;
			}
			if(req.originalUrl == '/requests')
			{
				res.render('club_requests', {clubs: clubs});
			}
			else
			{
				var variables = supporting_functions.variablesExtractor(req.originalUrl);
				var choice = variables[0][1];
				var clubName = supporting_functions.fromASCIItoCharacter(variables[1][1]);
				if(choice == 'approve')
				{
					var clubData;
					//Query DB and transfer it to the collection 'club' 
					models.pending_requests_model.findOne({clubName: clubName}, {_id:0, __v:0},function(err, club){ 
						if(err)
						{
							throw err;
						}
						clubData = club;
					});
					console.log(clubData);
					models.club_model.findOne({}, function(err){
						if(err)
						{
							throw err;
						}
						var newClub = new models.club_model({"clubName": clubData.clubName,
															 "existsAt": clubData.existsAt, 
															 "news" : []
															}); 
						newClub.save(function(err){
							if(err)
							{
								throw err;
							}
							models.pending_requests_model.remove({clubName: clubName}, function(err){
								if(err)
								{
									throw err;
								}
								res.send('Request Approved!');
							});							
						});						
					});
				}
				else if(choice == 'decline')
				{
					//Delete Document from pending requests collection
					models.pending_requests_model.remove({clubName: clubName}, function(err){
						if(err)
						{
							throw err;
						}
						res.send('Club request removed!');
					});					
				}
			}
		});
	}
	else
	{
		res.send('Sorry, Page Not available!');
	}
}

exports.clubProfileResponseHandler = function(req, res){

		var clubName = supporting_functions.fromASCIItoCharacter(req.param('clubName'));
			models.club_model.findOne({clubName: clubName}, function(err, clubData){
				if(err)
				{
					throw err;
				}
				//var clubData = JSON.stringify(clubData);
				console.log(clubData.news);
				res.render('club_profile', {
											clubName : clubData.clubName,
											news: clubData.news, 
											existsAt: clubData.existsAt
										});
			});

}

exports.addNewsResponseHandler = function(req, res){
	models.club_model.findOne({clubName : req.body.clubName}, function(err, clubData){
		if(err)
		{
			throw err;
		}
		if(!clubData)
		{
			res.send("Picked club does not exists. :(");
		}
		else
		{
			var updatedNews = clubData.news;
			updatedNews.push({clubName: req.body.clubName, studentName: app.username, content : req.body.news});
			models.club_model.where({clubName : req.body.clubName})
				  .setOptions({overwrite: true})
				  .update({$set : {news: updatedNews}}, function(err){
				if(err)
				{
					throw err
				}
				res.redirect('/clubs_'+ req.body.clubName);
			});
		}
	});
}