var Api = require('./api/api.js'),
		Utils = require('./utils/utils.js');

//Authentication
exports.signInResponseHandler = function(req, res) {
	var email = req.body.email,
		password = req.body.password,
		authenticationType = req.body.authenticationType;
	Api.authentication.signin(email, password, authenticationType, function(account){
		if(!account)
		{
			response = {
				status : 500,
				message : 'Entered wrong email or password!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Successfully signed In!',
				data : account
			};
			res.json(response);
		}
	});
}

exports.signUpResponseHandler = function(req, res) {
	var credentials = {
				key : key,
				email : req.body.email,
				password : req.body.password,
				username : req.body.username,
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				university : req.body.university,
				currentCity : req.body.currentCity
			};
	Api.authentication.signup(credentials, function(account){
		if(!account)
		{
			response = {
				status : 500,
				message : 'Email address is alread registered!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Account was successfully created!',
				data : account
			};
			res.json(response);
		}
	});
}

//Student
exports.getStudentInfoResponseHandler = function(req, res){
	var response,
			secret = req.body.secret,
			authEmail = req.body.email,
			reqEmail = req.body.data.email
			data = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, data, 'student', function(user){
		if(user)
		{
			Api.search.student.getStudentInfo(authEmail, function(studentInfo){
				if(!studentInfo)
				{
					response = {
						status : 500,
						message : 'No student data was found!',
						data : null
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : 'Student data was found!',
						data : studentInfo
					};
					res.json(response);
				}
			});
		}
		else
		{
			response = {
				status : 500,
				message : 'Access denied. Please signin to view this page!',
				data : null
			};
			res.json(response);
		}
	});
}

exports.getClubInfoResponseHandler = function(req, res){
	var clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			token = req.body.token,
			response;
	Api.search.club.getClubInfo(clubName, universityAt, function(clubInfo){
		if(!clubInfo)
		{
			response = {
				status : 500,
				message : 'No club found by ' + clubName + ' at ' + universityAt + '.',
				data : null
			}
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club information was found!',
				data : clubInfo
			}
			res.json(response);
		}
	});
}

exports.getSimilarClubsResponseHandler = function(req, res){
	//student and club home view
	var clubName = req.body.data.clubName,
			token = req.body.token,
			response;
	Api.search.club.getSimilarClubs(clubName, function(clubs){
		if(!clubs)
		{
			response = {
				status : 500,
				message : 'No similar club(s) found!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Similar club(s) found!',
				data : clubs
			};
			res.json(response);
		}
	});
}

exports.updateAccountInfoResponseHandler = function(req, res){
	var studentId = req.body.data.studentId,
		update = req.body.data.update,
		token = req.body.token,
		response;
	Api.student.updateAccountInfo(studentId, update, function(upToDateAccountInfo){
		if(!upToDateAccountInfo)
		{
			response = {
				status : 500,
				message : 'Account failed to be updated!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Account information updated!',
				data : upToDateAccountInfo
			};
			res.json(response);
		}
	});
}

exports.deleteAccount = function(req, res){
	var email = req.body.data.email,
			token = req.body.token;
	Api.student.deleteAccount(email, function(status){
		if(!status)
		{
			response = {
				status : 500,
				message : 'Account did not get deleted!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Account deleted!',
				data : status
			};
			res.json(response);
		}
	});
}

// Admin
exports.getAllClubsResponseHandler = function(req, res){
	var token = req.body.token;
	Api.search.club.getClubsInfo(function(clubs){
		if(!clubs)
		{
			response = {
				status : 500,
				message : 'No clubs were not found!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club(s) found!',
				data : clubs
			};
			res.json(response);
		}
	});
}

exports.getAllStudentsResponseHandler = function(req, res){
	Api.search.student.getStudentsInfo(function(students){
		if(!students)
		{
			response = {
				status : 500,
				message : 'Students were not found!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Student(s) found!',
				data : students
			};
			res.json(response);
		}
	});
}

exports.getClubRequestsResponseHandler = function(req, res){
	Api.admin.getClubRequests(function(requests){
		if(!requests)
		{
			response = {
				status : 500,
				message : 'Club requests were not found!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club requests(s) found!',
				data : requests
			};
			res.json(response);
		}
	});
}

exports.approveClubRequestResponseHandler = function(req, res){
	var clubId = req.body.clubId;
	Api.admin.approveClubRequest(clubId, function(club){
		if(!club)
		{
			response = {
				status : 500,
				message : 'Club request approval was not successful!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club request was successfully approved!',
				data : club
			};
			res.json(response);
		}
	});
}

exports.declineClubRequestResponseHandler = function(req, res){
	var clubId = req.body.clubId;
	Api.admin.declineClubRequest(clubId, function(status){
		if(!status)
		{
			response = {
				status : 500,
				message : 'Club request approval was not successful!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club request was successfully approved!',
				data : status
			};
			res.json(response);
		}
	});
}

//Club
exports.listNewsResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt;
	Api.post.ListNews(clubName, universityAt, function(news){
		if(news.length == 0)
		{
			response = {
				status : 500,
				message : 'Sorry, no new was found!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Posts were found!',
				data : news
			};
			res.json(response);
		}
	});
}

exports.addClubResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email;
	Api.club.addClub(clubName, universityAt, firstName, lastName, email, function(club){
		if(!club)
		{
			response = {
				status : 500,
				message : 'Club already exists!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club request was successfully submitted. ' + club.clubName +' will be added on College Clubs MN soon, Thanks!',
				data : club
			};
			res.json(response);
		}
	});
}

exports.removeClubResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email;
	Api.club.removeClub(clubName, universityAt, firstName, lastName, email, function(club){
		if(!club)
		{
			response = {
				status : 500,
				message : 'Club does not exists!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Club removal request was successfully submitted. ' + club +' will be removed from College Clubs MN soon, Thanks!',
				data : club
			};
			res.json(response);
		}
	});
}

exports.postNewsResponseHandler = function(req, res){
	var clubName = req.body.clubName,
		universityAt = req.body.universityAt,
		news = req.body.news,
		firstName = req.body.firstName,
		lastName = req.body.lastName;
	Api.post.postNews(clubName, universityAt, news, firstName, lastName, function(post){
		if(!post)
		{
			response = {
				status : 500,
				message : 'Entered club does not exists!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'New successfully posted!',
				data : post
			};
			res.json(response);
		}
	});
}

exports.deleteNewsResponseHandler = function(req, res){
	var postId = req.body.postId;
	Api.post.deleteNews(postId, function(post){
		if(!post)
		{
			response = {
				status : 500,
				message : 'Entered post id does not exists!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Post was successfully removed from !' + post.clubName + ' at ' + post.universityAt + '.',
				data : post
			};
			res.json(response);
		}
	});
}

exports.addCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		comment = req.body.comment,
		commenterFirstName = req.body.commenterFirstName,
		commenterLastName = req.body.commenterLastName;
	Api.comment.addComment(postId, comment, commenterFirstName, commenterLastName, function(comment){
		if(!comment)
		{
			response = {
				status : 500,
				message : 'Error occured while adding comment!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Comment was successfully added!',
				data : comment
			};
			res.json(response);
		}
	});
}

exports.editCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		commentId = req.body.commentId
		comment = req.body.comment;
	Api.comment.editComment(postId, commentId, comment, function(comment){
		if(!comment)
		{
			response = {
				status : 500,
				message : 'Error occured while updating comment!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Comment was successfully updated!',
				data : comment
			};
			res.json(response);
		}
	});
}

exports.removeCommentResponseHandler = function(req, res){
	var postId = req.body.postId,
		commentId = req.body.commentId;
	Api.comment.removeComment(postId, commentId, function(status){
		if(!comment)
		{
			response = {
				status : 500,
				message : 'Error occured while removing comment!',
				data : null
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : 'Comment was successfully removed!',
				data : comment
			};
			res.json(response);
		}
	});
}



