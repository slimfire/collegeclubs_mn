angular.module('collegeClubs.util.hashes.factory', [])
	.service('hashesFactory', function(){
		var SHA256 = new Hashes.SHA256;
		var hashesFactory = function(){}

		hashesFactory.prototype.sha256 = function(string){
			return SHA256.hex(string);
		}

		return new hashesFactory();
	})