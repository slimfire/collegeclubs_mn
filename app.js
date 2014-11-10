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
var routes = require('./controllers/routes.js');
var user_model = require('./models/user_model.js');
var user_authentication = ('./controllers/user_authentication.js');
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

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(done,user){
	user_model.findById(function(id, err){
		done(err,user);
	})
});

//routes
app.get('/', routes.indexResponseHandler);
app.get('/signin', routes.signinResponseHandler);
app.get('/signup', routes.signupResponseHandler);
app.get('/profile', routes.profileResponseHandler);
app.get('/failure', routes.failureResponseHandler);
app.post('/signin',
	passport.authenticate('signin_local_strategy', { successRedirect:'/profile', 
													 failureRedirect: '/failure'})
	);

app.listen(3000);