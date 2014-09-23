stories = new Meteor.Collection('stories');

Meteor.methods({
	share: function( story ) {

		var output = {};

		var errors = [];

		if( !story.name ) {
			errors.push('Please choose a name');
		}

		if( !story.story ) {
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
			// throw an error to populate the error variable on the method callback
			// throw a 400 error so that the server-client communication meets http response code standards
			// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400
			throw new Meteor.Error( 400, errors );
		}
		
		return output;

	},

	modifyStory: function( id, story ) {
		var output = {};
		var errors = [];

		// normalize the input
		id = id && id._id;

		if( !id || !story ) {
			errors.push('Please supply both an ID and a story with data');
		}

		if( story._id ) {
			story = _.without( story, '_id' );
		}

		if( !story.name ) {
			errors.push('Please choose a name');
		}

		if( !story.story ) {
			errors.push('Please write a story');
		}

		if( !story.theme ) {
			errors.push('Please select a theme');
		}

		if( !errors.length ) {
			stories.update( id , {$set: story});
			return output;
		} else {
			// throw an error to populate the error variable on the method callback
			// throw a 400 error so that the server-client communication meets http response code standards
			// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400
			throw new Meteor.Error( 400, errors );
		}
	},

	exportStories: function() {
		
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

