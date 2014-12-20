var express = require('express');
var connect = require('connect');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');;
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');
var routes = require('./routes/routes.js');
var models = require('./models/user_model.js');
var user_model = models.user_model;
var club_model = models.club_model;
var admin_model = models.admin_model;
var rest_api = require('./routes/rest_api.js');
var app = express();
var isSignedIn = false;

//configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(express.Router());
app.use(serveStatic(__dirname + '/public_assets'));
app.use(passport.initialize());
app.use(passport.session());

if('development' == app.get('env')){
	app.use(errorHandler({dumpExceptions:true,showStack:true}));
}
if('production' == app.get('env')){
	app.use(errorHandler());
}

//user authentication on sign in
passport.use('signin_local_strategy', new localStrategy({usernameField: 'email'},
	function(email,password,done){
		user_model.findOne({email: email}, function(err, user){
			if(err)
				{
					return(done(err));
				}
			if(!user)
				{
					return(done(null,false));
				}
			if(user.password != password)
				{
					return(done(null,false));
				}
			return(done(null,user));
		});
	}
));

//user authentication on sign up
passport.use('signup_local_strategy',new localStrategy(
	{passReqToCallback: true},
	function(req, username, password, done)
	{
		user_model.findOne({email:req.body.email},function(err, user){
			if(err)
			{
				return done(err);
			}
			if(user == null)
			{
				var new_user = new user_model({
					username : req.body.username,
					firstName : req.body.firstName,
					lastName : req.body.lastName,
					university : req.body.university,	
					email : req.body.email,
					hometown : req.body.hometown,
					password : req.body.password
				});
				new_user.save(function(err){
					if(err)
					{
						throw err;
					}
				});
				user = new_user;    //Assigned the variable new_user to user to automatically serialize the new user.			
				return(done(null, user));
			}
			if(user.email == email)
				{
					return(done(null, false));
				}
		});
	}
));

passport.use('admin_authentication_strategy', new localStrategy(
	{usernameField: 'email'}, function(email, password, done){
		admin_model.findOne({email: email}, function(err, user){
			console.log(user);
			if(err)
			{
				throw err;
			}
			if(user == null)
			{
				return(done(null, false));
			}
			if(user.email == email)
			{
				if(user.password == password)
				{
					return(done(null, user));
				}
				return(done(null, false));
			}
		});
	}
));

//serialize user and export the the user information so that the router updates the view
passport.serializeUser(function(user, done){
	done(null, user.id);
	exports.isSignedIn = true;
	exports._id = user.id;
	exports.firstName = user.firstName;
	exports.lastName = user.lastName;
	exports.email = user.email;
	exports.username = user.username;
	exports.university = user.university;
	exports.hometown = user.hometown;
});

//deserialize  user by quering user's document id
passport.deserializeUser(function(id,done){
	user_model.findById(id, function(err, user){
		done(err,user);
	})
});

//routes
app.get('/', routes.indexResponseHandler);
app.get('/signin', routes.signinResponseHandler);
app.get('/signup', routes.signupResponseHandler);
app.get('/signout', function(req, res){
	req.logOut();
	res.redirect('/');
	exports.isSignedIn = false;
});
app.get('/profile', routes.userProfileResponseHandler);
app.get('/signin_error', routes.signinErrorResponseHandler);
app.get('/signup_error', routes.signupErrorResponseHandler);
app.get('/settings', routes.settingsResponseHandler);
app.get('/admin', routes.adminResponseHandler);
//app.get('/admin/clubs',routes.adminClubsResponseHandler)
app.post('/signin',
	passport.authenticate('signin_local_strategy', {successRedirect: '/profile',
													failureRedirect: '/signin_error'
}));

app.post('/signup',
	passport.authenticate('signup_local_strategy',
		{successRedirect:'/profile',
		 failureRedirect:'/signup_error'
		}));

app.post('/settings', routes.addClubResponseHandler);

app.post('/admin', 
	passport.authenticate('admin_authentication_strategy', {successRedirect: '/', 
															failureRedirect: '/admin'}));

//APIs
app.get('/clubs', routes.clubsResponseHandler);
app.get('/api/users', rest_api.getUsersResponseHandler);
app.get('/api/users/:user_email', rest_api.getUserByEmailAddressResponseHandler);
app.post('/api/create_user', rest_api.postUserResponseHandler);
app.put('/api/change_username', rest_api.updateUsername);
app.delete('/api/delete_user', rest_api.delete_user);

app.listen(3000);