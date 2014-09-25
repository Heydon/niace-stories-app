/**
 * File for small collections of helpers
 * Move large helpers and stuff into client/features/feature.js
 */

Template.storiesList.helpers({
	stories: function() {
		return Stories.find( this.query || {} );
	},
	loggedIn: function() {
		return !!Meteor.user();
	},
	empty: function() {
		return Stories.find( this.query ).count() === 0;
	}
});

Template.manage.helpers({
	stories: function() {
		return Stories.find();
	}
});

/**
 * themes helpers
 */
Template.themes.helpers({
	themes: function() {
		return Themes.find();
	}
});

Template.theme.helpers({
	empty: function() {
		return Stories.find( this.query ).count() === 0;
	}
});
/***************************/

// helper to display the errors from the session
Template.errors.helpers({
	errors: function() {
		return Session.get('errors');
	}
});

// the destroy method clears errors so they are not there 
// when returning to the page
Template.errors.destroyed = function(){
  Session.set('errors', null);
};
