var stories = new Meteor.Collection('stories');

if( Meteor.isClient ) {
	// make stories globally available
	window.stories = stories;
}

Meteor.methods({
	share: function( story ) {
		var output = {};

		var errors = [];

		if( !story.name || story.name === '' ) {
			errors.push('Please choose a name');
		}

		if( !story.story || story.story === '' ) {
			errors.push('Please write a story');
		}

		if( !errors.length ) {
			story = _.extend(_.pick(story, 'name', 'story'), {
				published: false,
				submitted: new Date().getTime()
			});

			var storyId = stories.insert(story);
			output.id = storyId;
		} else {
			// throw 403: user error
			throw new Meteor.Error( 403, errors );
		}
		
		return output;

	},

	modifyStory: function( id, story ) {
		var output = {};
		var errors = [];

		id = id && id._id;

		if( !id || !story ) {
			errors.push('Please supply both an ID and a story with data');
		}

		if( story._id ) {
			story = _.without( story, '_id' );
		}

		if( !errors.length ) {
			stories.update( id , {$set: story});
			return output;
		} else {
			throw new Meteor.Error( 403, 'Error: \n' + errors.join('\n') );
		}
	}
});

stories.allow({
	update: function() {
		return true;
	},
	insert: function() {
		return true;
	}
});

