var express = require('express');
var connect = require('connect');
var passport = require('passport-local');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
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
app.use(serveStatic(__dirname + '/public'));

if('development' == app.get('env')){
	app.use(errorHandler({dumpExceptions:true,showStack:true}));
}
if('production' == app.get('env')){
	app.use(errorHandler());
}

//Routes
app.get('/', routes.indexResponseHandler);
app.get('/login', routes.loginResponseHandler);
app.get('/signup', routes.signupResponseHandler);

app.listen(3000);