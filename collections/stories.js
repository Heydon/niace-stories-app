Stories = new Meteor.Collection('stories');

Meteor.methods({
	submit: function(story) {
		var output = {
			errors: []
		};

		if (!story.name) {
			output.errors.push("Please choose a name");
		}

		if (!story.story) {
			output.errors.push("Please write a story");
		}

		if (!output.errors.length) {
			var story = _.extend(_.pick(story, 'name', 'story'), {
				published: false,
				submitted: new Date().getTime()
			});

			var storyId = Stories.insert(story);
			output.id = storyId;
		}

		return output;

	}
});

Stories.allow({
	update: function(userId, doc) {
		return !! userId;
	}
});

