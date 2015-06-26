var mongoose = require('mongoose');
var schema = mongoose.Schema;

var newClubRequestSchema = new schema({
	clubName: String,
	leaders : [{firstName : String, lastName : String, email : String}],
	universityAt: String,
}, {collection: 'newClubRequests'});


var newClubRequestModel = mongoose.model('newClubRequest', newClubRequestSchema);

module.exports = newClubRequestModel;