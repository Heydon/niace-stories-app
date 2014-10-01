/**
 * File for small collections of helpers
 * Move large helpers and stuff into client/features/feature.js
 */

Handlebars.registerHelper('storyThemeName', function(story) {
	return Themes.findOne(story.theme).themeName;
});

Template.storiesList.helpers({
	stories: function() {
		return Stories.find();
	},
	loggedIn: function() {
		return !!Meteor.user();
	},
	empty: function() {
		return Stories.find().count() === 0;
	}
});

Template.storiesList.rendered = function() {
	$('.truncated').trunk8({ lines: 5});
};

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
		return Stories.find().count() === 0;
	},
	name: function() {
		var theme = Themes.findOne( Router.current().params._id );
		return theme ? theme.themeName : 'theme not found';
	}
});

/* Inspiring Me */

function areThereStories() {
	var inspiring = ReactiveStore.get('inspiring');
	return inspiring && inspiring.length;
}

Template.me.helpers({
	someStories: function() {
		return !areThereStories();
	},
	stories: function() {
		return Stories.find();
	}
});

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

Template.message.helpers({
	message: function() {
		return Session.get('message');
	}
});

Template.message.destroyed = function(){
	Session.set('message', null);
};

Template.allStories.helpers({
	formatForDownload: function() {
		return JSON.stringify( _.map( Stories.find().fetch(), function( story ) {
			return _.omit( story, '_id' );
		}));
	}
});

Template.inspiringRadios.helpers({
	checked: function() {
		var index = _.indexOf( ReactiveStore.get('inspiring') || [], this._id );
		return index > -1 ? 'checked' : '';
	},

	notChecked: function() {
		var index = _.indexOf( ReactiveStore.get('inspiring') || [], this._id );
		return index > -1 ? '' : 'checked';
	}
});
