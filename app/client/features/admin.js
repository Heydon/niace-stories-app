/**
 * Header
 */
Template.admin.events({
	'click .logout': function() {
		Meteor.logout(function() {
			Router.go('/');
		});
	}
});

/**
 * header helpers
 */
Template.admin.helpers({
	loggedIn: function() {
		// if we
		return Meteor.user();
	}
});
/***************************/