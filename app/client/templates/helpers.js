/**
 * File for small collections of helpers
 * Move large helpers and stuff into client/features/feature.js
 */

Template.stories.helpers({
	stories: function() {
		return stories.find({}, {sort: {submitted: -1}});
	}
});

Template.manage.helpers({
	stories: function() {
		return stories.find();
	}
});

/**
 * themes helpers
 */
Template.themes.helpers({
	themes: function() {
		return themes.find();
	}
});

Template.theme.helpers({
	empty: function() {
		return this.stories.count() === 0;
	}
});
/***************************/

/**
 * header helpers
 */
Template.header.helpers({
	loggedIn: function() {
		return Meteor.user();
	}
});
/***************************/
