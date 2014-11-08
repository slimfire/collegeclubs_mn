
exports.indexResponseHandler = function (req, res){
	res.render('index', {title: "College Clubs MN"});
}

exports.signinResponseHandler = function (req, res){
	res.render('signin', {title:"College Clubs MN | Sign in"});
}

exports.signupResponseHandler = function(req, res){
	res.render('signup', {title: "College Clubs MN | Sign Up"});
}

