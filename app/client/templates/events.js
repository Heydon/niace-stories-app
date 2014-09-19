/**
 * File for small collections of events
 * Move large helpers and stuff into client/features/feature.js
 */

/**
 * Header
 */
Template.header.events({
	'click .logout': function() {
		Meteor.logout(function() {
			Router.go('/');
		});
	}
});
