var SigninType = function(){}

SigninType.prototype.getSigninType = function(userType){
	if(userType == 'student')
	{
		return 'studentModel';
	}
	else if(userType == 'admin')
	{
		return 'adminModel';
	}
}

module.exports = new SigninType()