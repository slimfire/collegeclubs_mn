module.exports = {
	models : {
		CLUB_MODEL : 'clubModel',
		ADMIN_MODEL : 'adminModel',
		STUDENT_MODEL : 'studentModel',
		NEW_CLUB_REQUEST_MODEL : 'newClubRequestModel',
		CLUB_REMOVAL_REQUEST_MODEL : 'clubRemovalRequestModel',
		POST_MODEL : 'postModel'
	},
	messages : {
		error : {
			ACCESS_DENIED : 'Access denied. Please signin to view this page!',
			WRONG_EMAIL : 'Entered wrong email or password!',
			EMAIL_EXISTS : 'Email address is already registered!',
			NO_STUDENT_FOUND : 'No student data was found!',
			NO_CLUB_FOUND : 'No club found !',
			NO_SIMILAR_CLUBS : 'No similar club(s) found!',
			CAN_NOT_UPDATE_ACCOUNT : 'Account failed to be updated!',
			ACCOUNT_NOT_AVAILABLE : 'Account did not get deleted!',
			NO_CLUBS_FOUND : 'No clubs were not found!',
			NO_STUDENTS_FOUND : 'Students were not found!',
			NO_CLUB_REQUESTS_FOUND : 'Club requests were not found!',
			CLUB_REQUESTS_NOT_APPROVED : 'Club request approval was not successful!',
			CLUB_REQUESTS_NOT_DECLINED : 'Club request denial was not successful!',
			NEWS_NOT_FOUND : 'Sorry, no news was found!',
			CLUB_EXISTS : 'Club already exists!',
			CLUB_DOES_NOT_EXIST : 'Club does not exists!',
			POST_ID_DOES_NOT_EXIST : 'Entered post id does not exists!',
			CAN_NOT_ADD_COMMENT : 'Error occured while adding comment!',
			CAN_NOT_UPDATE_COMMENT : 'Error occured while updating comment!',
			CAN_NOT_DELETE_COMMENT : 'Error occured while removing comment!',
			MODEL_NOT_FOUND : 'Error : The model name you are looking is not available. Check the spelling.'

		},
		success : {
			SIGNED_IN : 'Successfully signed In!',
			SIGNED_UP : 'Account was successfully created!',
			STUDENT_FOUND : 'Student data was found!',
			CLUB_FOUND : 'Club information was found!',
			SIMILAR_CLUBS_FOUND : 'No similar club(s) found!',
			ACCOUNT_UPDATED : 'Account information updated!',
			ACCOUNT_DELETED : 'Account deleted!',
			CLUBS_FOUND : 'Club(s) found!',
			STUDENTS_FOUND : 'Student(s) found!',
			CLUB_REQUESTS_FOUND : 'Club requests(s) found!',
			CLUB_REQUEST_APPROVED : 'Club request was successfully approved!',
			CLUB_REQUEST_DECLINED : 'Club request was successfully declined!',
			POSTS_FOUND : 'Posts were found!',
			CLUB_ADDED : 'Club request was successfully submitted. Club will be added on College Clubs MN soon, Thanks!',
			CLUB_REMOVED : 'Club removal request was successfully submitted. Club will be removed from College Clubs MN soon, Thanks!',
			NEWS_POSTED : 'News successfully posted!',
			POST_REMOVED : 'Post was successfully removed !',
			COMMENT_ADDED : 'Comment was successfully added!',
			COMMENT_UPDATED : 'Comment was successfully updated!',
			COMMENT_REMOVED : 'Comment was successfully removed!'
		}
	}
}