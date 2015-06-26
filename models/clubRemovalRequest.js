var mongoose = require('mongoose');
var schema = mongoose.Schema;

var clubRemovalRequestSchema = new schema({
	clubName: String,
	requester : {firstName : String, lastName : String, email : String},
	universityAt: String,
}, {collection: 'clubRemovalRequests'});


var clubRemovalRequestModel = mongoose.model('clubRemovalRequest', clubRemovalRequestSchema);

module.exports = clubRemovalRequestModel;