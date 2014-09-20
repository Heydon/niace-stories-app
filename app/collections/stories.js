Stories = new Meteor.Collection('stories');

Meteor.methods({
	submit: function( story ) {
		var output = {};

		var errors = [];

		if( !story.name ) {
			errors.push('Please choose a name');
		}

		if( !story.story ) {
			errors.push('Please write a story');
		}

		if( !story.theme ) {
			errors.push('Please choose a theme');
		}

		if( !errors.length ) {
			story = _.extend(_.pick(story, 'name', 'story'), {
				published: false,
				submitted: new Date().getTime()
			});

			var storyId = Stories.insert(story);
			output.id = storyId;

			return output;
		} else {
			throw new Meteor.Error( 403, 'Error: \n' + errors.join('\n') );
		}
	},

	update: function( id, story ) {
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

