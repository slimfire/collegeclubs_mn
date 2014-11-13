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
var user_model = require('./models/user_model.js');
var app = express();

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
passport.use('signin_local_strategy', new localStrategy(
	function(username,password,done){
		user_model.findOne({username: username}, function(err, user){
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
		user_model.findOne({username:username},function(err, user){
			if(err)
			{
				return done(err);
			}
			if(user == null)
			{
				var new_user = new user_model({
					username: username,
					password: password,
					university: req.body.university,
					hometown: req.body.hometown
				});
				new_user.save(function(err){
					if(err)
					{
						console.log(err);
					}
				});
				user = new_user;    //Assigned the variable new_user to user to authematically serialize the new user.			
				return(done(null, user));
			}
			if(user.username == username)
				{
					return(done(null, false));
				}		
		});		
	}
));

//serialize user and export the the user information so that the router update the view
passport.serializeUser(function(user, done){
	done(null, user.id);
	exports._id = user.id;
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
app.get('/profile', routes.userProfileResponseHandler);
app.get('/signin_error', routes.signinErrorResponseHandler);
app.get('/signup_error', routes.signupErrorResponseHandler);

app.post('/signin',
	passport.authenticate('signin_local_strategy', {successRedirect: '/profile',
													failureRedirect: '/signin_error'
}));

app.post('/signup',
	passport.authenticate('signup_local_strategy',
		{successRedirect:'/profile',
		 failureRedirect:'/signup_error'
		}));

app.listen(3000);