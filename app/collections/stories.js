Stories = new Meteor.Collection('stories');

Meteor.methods({
	share: function( story ) {

		var output = {};

		output.errors = [];

		if( !story.name || story.name === '' ) {
			output.errors.push('Please choose a name');
		}

		if( !story.story || story.story === '' ) {
			output.errors.push('Please write a story');
		}

		if( !output.errors.length ) {
			story = _.extend(_.pick(story, 'name', 'story'), {
				published: false,
				submitted: new Date().getTime()
			});

			var storyId = Stories.insert(story);
			output.id = storyId;
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
			Stories.update( id , {$set: story});
			return output;
		} else {
			throw new Meteor.Error( 403, 'Error: \n' + errors.join('\n') );
		}
	}
});

Stories.allow({
	update: function() {
		return true;
	},
	insert: function() {
		return true;
	}
});

