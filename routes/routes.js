
exports.indexResponseHandler = function (req, res){
	res.render('index', {title: "College Clubs MN"});
}

exports.signinResponseHandler = function (req, res){
	res.render('signin', {title:"College Clubs MN | Sign in"});
}

exports.signupResponseHandler = function(req, res){
	res.render('signup', {title: "College Clubs MN | Sign Up"});
}

exports.userProfileResponseHandler = function(req, res){
	res.render('user_profile', {title: "College Clubs MN | User Profile"});
}

exports.signinErrorResponseHandler = function(req, res){
	res.send("Faild to Sign in ! :(");
}