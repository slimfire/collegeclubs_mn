var Api = require('./api/api.js');

//Authentication
exports.signInResponseHandler = function(req, res) {
	var email = req.body.email,
		password = req.body.password,
		authenticationType = req.body.authenticationType;
	Api.authentication.signin(email, password, authenticationType, function(account){
		res.json(account);
	});
}

exports.signUpResponseHandler = function(req, res) {
	var credentials = {
		email : req.body.email,
		password : req.body.password,
		username : req.body.username,
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		university : req.body.university,
		currentCity : req.body.currentCity
	}
	Api.authentication.signup(credentials, function(account){
		res.json(account);
	});
}

//Student
exports.getStudentInfoResponseHandler = function(req, res){
	var email = req.body.email;
	Api.search.student.getStudentInfo(email, function(studentInfo){
		res.json(studentInfo);
	});
}

exports.getClubInfoResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt;
	Api.search.club.getClubInfo(clubName, universityAt, function(clubInfo){
		res.json(clubInfo);
	});
}

exports.getSimilarClubsResponseHandler = function(req, res){
	//student and club home view
	var clubName = req.body.clubName;
	Api.search.club.getSimilarClubs(clubName, function(clubs){
		res.json(clubs);
	});
}

exports.updateAccountInfoResponseHandler = function(req, res){
	var studentId = req.body.studentId,
		update = req.body.update;
	Api.student.updateAccountInfo(studentId, update, function(upToDateAccountInfo){
		res.json(upToDateAccountInfo);
	});
}

exports.deleteAccount = function(req, res){
	var email = req.body.email;
	Api.student.deleteAccount(email, function(status){
		res.json(status);
	});
}

// Admin
exports.getAllClubsResponseHandler = function(req, res){
	Api.search.club.getClubsInfo(function(clubs){
		res.json(clubs);
	});
}

exports.getAllStudentsResponseHandler = function(req, res){
	Api.search.student.getStudentsInfo(function(students){
		res.json(students);
	});
}

exports.getClubRequestsResponseHandler = function(req, res){
	Api.admin.getClubRequests(function(requests){
		res.json(requests);
	});
}

exports.approveClubRequestResponseHandler = function(req, res){
	var clubId = req.body.clubId;
	Api.admin.approveClubRequest(clubId, function(club){
		res.json(club);
	});
}

exports.declineClubRequestResponseHandler = function(req, res){
	var clubId = req.body.clubId;
	Api.admin.declineClubRequest(clubId, function(status){
		res.json(status);
	});
}

//Club
exports.listNewsResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt;
	Api.post.ListNews(clubName, universityAt, function(news){
		res.json(news);
	});
}

exports.addClubResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email;
	Api.club.addClub(clubName, universityAt, firstName, lastName, email, function(response){
		//response object has error and response keys inside it
		res.json(response);
	});
}

exports.removeClubResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email;
	Api.club.removeClub(clubName, universityAt, firstName, lastName, email, function(response){
		//response object has error and response keys inside it
		res.json(response);
	});
}

exports.postNewsResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		news = req.body.news,
		firstName = req.body.firstName,
		lastName = req.body.lastName;
	Api.post.postNews(clubName, universityAt, news, firstName, lastName, function(post){
		res.json(post);
	});
}

exports.deleteNewsResponseHandler = function(req, res){
	var postId = req.body.postId;
	Api.post.deleteNews(postId, function(status){
		res.json(status);
	});
}

exports.addCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		comment = req.body.comment,
		commenterFirstName = req.body.commenterFirstName,
		commenterLastName = req.body.commenterLastName;
	Api.comment.addComment(postId, comment, commenterFirstName, commenterLastName, function(comment){
		res.json(comment);
	});
}

exports.editCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		commentId = req.body.commentId
		comment = req.body.comment;
	Api.comment.editComment(postId, commentId, comment, function(comment){
		res.json(comment);
	});
}

exports.removeCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		commentId = req.body.commentId;
	Api.comment.removeComment(postId, commentId, function(status){
		res.json(status);
	});
}



