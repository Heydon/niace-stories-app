/**
 * Header
 */
Template.header.events({
	'click .logout': function() {
		Meteor.logout(function() {
			Router.go('/');
		});
	},
	'click .export-stories': function() {
		var user = Meteor.user();
		if( user ) {
			var a = document.createElement('a');
			//var email = _.pluck(user.emails, 'address')[0] || 'usersemail';

			var s = _.map( Stories.find().fetch(), function( story ) {
				return _.omit( story, '_id' );
			});

			a.href = 'data:text/plain,' + JSON.stringify( s );
			a.download = 'stories.json';
			a.click();
		}
	}
});

/**
 * header helpers
 */
Template.header.helpers({
	loggedIn: function() {
		return Meteor.user();
	}
});
/***************************/