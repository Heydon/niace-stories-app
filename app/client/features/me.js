/* Inspiring Me */
Template.me.helpers({
	noInspiration: function( theme ) {
		if( theme ) {
			return !Stories.find({
				themes: {
					$in: [theme]
				}
			}).count();
		} else {
			return !Stories.find().count();
		}
	},
	themes: function() {
		return Themes.find();
	},
	stories: function() {
		return Stories.find({
			themes: {
				$in: [this._id]
			}
		});
	},
	size: function( thing ) {
		return thing.count();
	},
	storiesKeywords: function() {
		// underscore chainy goodness
		return _.chain(Stories.find({
				themes: {
					$in: [this._id]
				}
			}).fetch())
			.pluck('keywords')
			.flatten()
			.unique()
			.value();
	},
	resources: function() {
		return Resources.find({
			keywords: {
				$in: this.keywords
			}
		});
	}
});

Template.me.events({
	'click .expando-parent:not(.no-stories) .expando-controls': function( evt ) {
		if( evt.target.nodeName !== 'A' ) {
			$(evt.currentTarget)
				// get the expando
				.parents('.expando-parent')
				.toggleClass('collapsed')
				.toggleClass('open');
		}
	}
});