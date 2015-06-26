var mongoose = require('mongoose');
var schema = mongoose.Schema;

var clubSchema = new schema({
	clubName: String,
	leaders : [{firstName : String, lastName : String, email : String}],
	universityAt: String,
}, {collection: 'clubs'});


var clubModel = mongoose.model('club', clubSchema);

module.exports = clubModel;