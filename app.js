var express = require('express'),
	connect = require('connect'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	serveStatic = require('serve-static'),
	errorHandler = require('errorhandler'),
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
	res.sendFile(__dirname + '/client/app/index.html');
});

app.post('/signin', routes.signInResponseHandler);
app.post('/singup',routes.signUpResponseHandler);
app.post('/student/getStudentInfo', routes.getStudentInfoResponseHandler);
app.post('/club/getClubInfo', routes.getClubInfoResponseHandler);
app.post('/club/getSimilarClubs', routes.getSimilarClubsResponseHandler);
app.post('/student/getSimilarClubs', routes.getSimilarClubsResponseHandler);
app.post('/student/updateAccountInfo', routes.updateAccountInfoResponseHandler);
app.post('/student/deleteAccount', routes.deleteAccount);
app.get('/club/getAllClubs', routes.getAllClubsResponseHandler);
app.get('/student/getAllStudents', routes.getAllStudentsResponseHandler);
app.get('/admin/getClubRequests', routes.getClubRequestsResponseHandler );
app.post('/admin/approveClubRequest', routes.approveClubRequestResponseHandler);
app.post('/admin/declineClubRequest', routes.declineClubRequestResponseHandler);
app.post('/club/post/listNews', routes.listNewsResponseHandler);
app.post('/club/addClub', routes.addClubResponseHandler);
// app.post('/club/removeClub', routes.removeClubResponseHandler);//@TODO fix bugs on method
app.post('/club/post/postNews', routes.postNewsResponseHandler);
app.post('/club/post/deleteNews', routes.deleteNewsResponseHandler);
app.post('/club/post/comment/addComment', routes.addCommentResponseHandler);
app.post('/club/post/comment/editComment', routes.editCommentResponseHandler);
app.post('/club/post/comment/removeComment', routes.removeCommentResponseHandler);



app.listen(process.env.PORT || 3000, function(){
	console.log('Magic happening on port 3000 :D . . . ');
});