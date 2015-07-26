var mongoose = require('mongoose'),
		Api = require('./api/api.js'),
		Utils = require('./utils/utils.js'),
		constants = require('./utils/constants.js'),
		successMessages = constants.messages.success,
		errorMessages = constants.messages.error,
		authenticationErrorResponse = {
			status : 500,
			message : errorMessages.ACCESS_DENIED,
			data : {
				userInfo : null,
				response : null
			}
		};

//Authentication
exports.signInResponseHandler = function(req, res) {
	var email = req.body.data.email,
		password = req.body.data.password,
		authenticationType = req.body.data.authenticationType;
	Api.authentication.signin(email, password, authenticationType, function(account){
		if(!account)
		{
			response = {
				status : 500,
				message : errorMessages.WRONG_EMAIL,
				data : {
					userInfo : null,
					response : null
				}
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : successMessages.SIGNED_IN,
				data : {
					userInfo : account,
					response : account
				}
			};
			res.json(response);
		}
	});
}

exports.signUpResponseHandler = function(req, res) {
	var credentials = {
				email : req.body.data.email,
				password : req.body.data.password,
				username : req.body.data.username,
				firstName : req.body.data.firstName,
				lastName : req.body.data.lastName,
				university : req.body.data.university,
				currentCity : req.body.data.currentCity
			};
	Api.authentication.signup(credentials, function(account){
		if(!account)
		{
			response = {
				status : 500,
				message : errorMessages.EMAIL_EXISTS,
				data : {
					userInfo : null,
					response : null
				}
			};
			res.json(response);
		}
		else
		{
			response = {
				status : 200,
				message : successMessages.SIGNED_UP,
				data : {
					userInfo : account,
					response : account
				}
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
			userType = req.body.userType,
			reqEmail = req.body.data.email
			data = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, data, userType, function(account){
		if(account)
		{
			Api.search.student.getStudentInfo(reqEmail, function(studentInfo){
				if(!studentInfo)
				{
					response = {
						status : 500,
						message : errorMessages.NO_STUDENT_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.STUDENT_FOUND,
						data : {
							userInfo : account,
							response : studentInfo
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.getClubInfoResponseHandler = function(req, res){
	var response,
			clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			userType = req.body.userType,
			authEmail = req.body.email,
			secret = req.body.secret,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.search.club.getClubInfo(clubName, universityAt, function(clubInfo){
				if(!clubInfo)
				{
					response = {
						status : 500,
						message : errorMessages.NO_CLUB_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					}
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_FOUND,
						data : {
							userInfo : account,
							response : clubInfo
						}
					}
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.getSimilarClubsResponseHandler = function(req, res){
	//student and club home view
	var clubName = req.body.data.clubName,
			authEmail = req.body.email,
			secret = req.body.secret,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data),
			response;
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.search.club.getSimilarClubs(clubName, function(clubs){
				if(!clubs)
				{
					response = {
						status : 500,
						message : errorMessages.NO_SIMILAR_CLUBS,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.SIMILAR_CLUBS_FOUND,
						data : {
							userInfo : account,
							response : clubs
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.updateAccountInfoResponseHandler = function(req, res){
	var studentId = req.body.data.studentId,
		update = req.body.data.update,
		secret = req.body.secret,
		authEmail = req.body.email,
		userType = req.body.userType,
		stringData = JSON.stringify(req.body.data),
		response;
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.student.updateAccountInfo(studentId, update, function(upToDateAccountInfo){
				if(!upToDateAccountInfo)
				{
					response = {
						status : 500,
						message : errorMessages.CAN_NOT_UPDATE_ACCOUNT,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.ACCOUNT_UPDATED,
						data : {
							userInfo : account,
							response : upToDateAccountInfo
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});	
}

exports.deleteAccount = function(req, res){
	var reqEmail = req.body.data.email,
			userType = req.body.userType,
			authEmail = req.body.email,
			secret = req.body.secret,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.student.deleteAccount(reqEmail, function(status){
				if(!status)
				{
					response = {
						status : 500,
						message : errorMessages.ACCOUNT_NOT_AVAILABLE,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.ACCOUNT_DELETED,
						data : {
							userInfo : account,
							response : status
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

// Admin
exports.getAllClubsResponseHandler = function(req, res){
	var secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.search.club.getClubsInfo(function(clubs){
				if(!clubs)
				{
					response = {
						status : 500,
						message : errorMessages.NO_CLUBS_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUBS_FOUND,
						data : {
							userInfo : account,
							response : clubs
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.getAllStudentsResponseHandler = function(req, res){
	var secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.search.student.getStudentsInfo(function(students){
				if(!students)
				{
					response = {
						status : 500,
						message : errorMessages.NO_STUDENTS_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.STUDENTS_FOUND,
						data : students
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.getClubRequestsResponseHandler = function(req, res){
	var secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.admin.getClubRequests(function(requests){
				if(!requests)
				{
					response = {
						status : 500,
						message : errorMessages.NO_CLUB_REQUESTS_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_REQUESTS_FOUND,
						data : {
							userInfo : account,
							response : requests
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});

}

exports.approveClubRequestResponseHandler = function(req, res){
	var clubId = req.body.data.clubId,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.admin.approveClubRequest(clubId, function(club){
				if(!club)
				{
					response = {
						status : 500,
						message : errorMessages.CLUB_REQUESTS_NOT_APPROVED,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_REQUEST_APPROVED,
						data : {
							userInfo : account,
							response : club
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);	
		}
	});

}

exports.declineClubRequestResponseHandler = function(req, res){
	var clubId = req.body.data.clubId,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.admin.declineClubRequest(clubId, function(status){
				if(!status)
				{
					response = {
						status : 500,
						message : errorMessages.CLUB_REQUESTS_NOT_DECLINED,
						data : {
							userInfo : null,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_REQUEST_DECLINED,
						data : {
							userInfo : account,
							response : status
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

//Club
exports.listNewsResponseHandler = function(req, res){
	var clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.post.ListNews(clubName, universityAt, function(news){
				if(news.length == 0)
				{
					response = {
						status : 500,
						message : errorMessages.NEWS_NOT_FOUND,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.POSTS_FOUND,
						data : {
							userInfo : account,
							response : news
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.addClubResponseHandler = function(req, res){
	var clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			firstName = req.body.data.firstName,
			lastName = req.body.data.lastName,
			reqEmail = req.body.data.email,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.club.addClub(clubName, universityAt, firstName, lastName, reqEmail, function(club){
				if(!club)
				{
					response = {
						status : 500,
						message : errorMessages.CLUB_EXISTS,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_ADDED,
						data : {
							userInfo : account,
							response : club
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.removeClubResponseHandler = function(req, res){
	var clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			firstName = req.body.data.firstName,
			lastName = req.body.data.lastName,
			reqEmail = req.body.data.email,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.club.removeClub(clubName, universityAt, firstName, lastName, reqEmail, function(club){
				if(!club)
				{
					response = {
						status : 500,
						message : errorMessages.CLUB_DOES_NOT_EXIST,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.CLUB_REMOVED,
						data : {
							userInfo : account,
							response : club
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.postNewsResponseHandler = function(req, res){
	var clubName = req.body.data.clubName,
			universityAt = req.body.data.universityAt,
			news = req.body.data.news,
			firstName = req.body.data.firstName,
			lastName = req.body.data.lastName,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.post.postNews(clubName, universityAt, news, firstName, lastName, function(post){
				if(!post)
				{
					response = {
						status : 500,
						message : errorMessages.CLUB_DOES_NOT_EXIST,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.NEWS_POSTED,
						data : {
							userInfo : account,
							response : post
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.deleteNewsResponseHandler = function(req, res){
	var postId = req.body.data.postId,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.post.deleteNews(postId, function(post){
				if(!post)
				{
					response = {
						status : 500,
						message : errorMessages.POST_ID_DOES_NOT_EXIST,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.POST_REMOVED,
						data : {
							userInfo : account,
							response : post
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.addCommentResponseHandler = function(req, res){
	var postId = req.body.data.postId,
			comment = req.body.data.comment,
			commenterFirstName = req.body.data.commenterFirstName,
			commenterLastName = req.body.data.commenterLastName,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.comment.addComment(postId, comment, commenterFirstName, commenterLastName, function(comment){
				if(!comment)
				{
					response = {
						status : 500,
						message : errorMessages.CAN_NOT_ADD_COMMENT,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.COMMENT_ADDED,
						data : {
							userInfo : account,
							response : comment
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.editCommentResponseHandler = function(req, res){
	var postId = req.body.data.postId,
			commentId = req.body.data.commentId
			comment = req.body.data.comment,
			secret = req.body.secret,
			authEmail = req.body.email,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.comment.editComment(postId, commentId, comment, function(comment){
				if(!comment)
				{
					response = {
						status : 500,
						message : errorMessages.CAN_NOT_UPDATE_COMMENT,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.COMMENT_UPDATED,
						data : {
							userInfo : account,
							response : comment
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}

exports.removeCommentResponseHandler = function(req, res){
	var postId = req.body.data.postId,
			commentId = req.body.data.commentId
			authEmail = req.body.email,
			secret = req.body.secret,
			userType = req.body.userType,
			stringData = JSON.stringify(req.body.data);
	Utils.request.authenticateRequest(authEmail, secret, stringData, userType, function(account){
		if(account)
		{
			Api.comment.removeComment(postId, commentId, function(comment){
				if(!comment)
				{
					response = {
						status : 500,
						message : errorMessages.CAN_NOT_DELETE_COMMENT,
						data : {
							userInfo : account,
							response : null
						}
					};
					res.json(response);
				}
				else
				{
					response = {
						status : 200,
						message : successMessages.COMMENT_REMOVED,
						data : {
							userInfo : account,
							response : comment
						}
					};
					res.json(response);
				}
			});
		}
		else
		{
			res.json(authenticationErrorResponse);
		}
	});
}