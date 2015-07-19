var express = require('express'),
	connect = require('connect'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	serveStatic = require('serve-static'),
	errorHandler = require('errorhandler'),
	path = require('path'),
	routes = require('./controllers/routes.js'),
	app = express();


//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(serveStatic(path.join(__dirname, 'client')));

if('development' == app.get('env')){
	app.use(errorHandler({dumpExceptions:true,showStack:true}));
}
if('production' == app.get('env')){
	app.use(errorHandler());
}

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.post('/api/signin', routes.signInResponseHandler);
app.post('/api/signup',routes.signUpResponseHandler);
app.post('/api/student/getStudentInfo', routes.getStudentInfoResponseHandler);
app.post('/api/club/getClubInfo', routes.getClubInfoResponseHandler);
app.post('/api/club/getSimilarClubs', routes.getSimilarClubsResponseHandler);
app.post('/api/student/updateAccountInfo', routes.updateAccountInfoResponseHandler);
app.post('/api/student/deleteAccount', routes.deleteAccount);
app.get('/api/club/getAllClubs', routes.getAllClubsResponseHandler);
app.get('/api/student/getAllStudents', routes.getAllStudentsResponseHandler);
app.get('/api/admin/getClubRequests', routes.getClubRequestsResponseHandler );
app.post('/api/admin/approveClubRequest', routes.approveClubRequestResponseHandler);
app.post('/api/admin/declineClubRequest', routes.declineClubRequestResponseHandler);
app.post('/api/club/post/listNews', routes.listNewsResponseHandler);
app.post('/api/club/addClub', routes.addClubResponseHandler);
app.post('/api/club/removeClub', routes.removeClubResponseHandler);
app.post('/api/club/post/postNews', routes.postNewsResponseHandler);
app.post('/api/club/post/deleteNews', routes.deleteNewsResponseHandler);
app.post('/api/club/post/comment/addComment', routes.addCommentResponseHandler);
app.post('/api/club/post/comment/editComment', routes.editCommentResponseHandler);
app.post('/api/club/post/comment/removeComment', routes.removeCommentResponseHandler);

app.listen(process.env.PORT || 3000, function(){
	console.log('Magic happening on port 3000 :D . . . ');
});