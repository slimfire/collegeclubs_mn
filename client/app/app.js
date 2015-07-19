angular.module('collegeClubs', [
	'collegeClubs.home',
	'collegeClubs.signin',
	'collegeClubs.signup',
	'collegeClubs.profiles',
	'collegeClubs.util',
	'ngMaterial',
	'ngCookies'
	])
	.config(function($mdThemingProvider){
	  $mdThemingProvider.theme('default')
	    .primaryPalette('deep-orange', {
	      'default': '500',
	      'hue-1': '100',
	      'hue-2': '600',
	      'hue-3': 'A100'
	    })
	    .accentPalette('yellow', {
	      'default': 'A100'
	    });
	});