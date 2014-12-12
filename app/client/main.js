Meteor.startup(function() {
	Meteor.subscribe('themes');
	Meteor.subscribe('glossary');
	Meteor.subscribe('config');
});
