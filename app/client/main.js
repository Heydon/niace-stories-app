Meteor.startup(function() {
	Meteor.subscribe('themes');
	Meteor.subscribe('resources');
	Meteor.subscribe('config');
});