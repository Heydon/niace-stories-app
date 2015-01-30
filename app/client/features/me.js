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
		var themes = Themes.find().fetch();
		var byWeight = themes.slice(0);
		byWeight.sort(function(a,b) {
		    return a.weight - b.weight;
		});

		return byWeight;
	},
	stories: function() {
		return Stories.find({
			themes: {
				$in: [this._id]
			},
			_id: {
				$in: ReactiveStore.get('inspiring') || []
			}
		});
	},
	size: function( thing ) {
		return thing.count();
	},
	disabled: function( stories ) {
		return stories.count() ? '' : 'disabled';
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

			var expanded = $(evt.currentTarget).attr('aria-expanded') === 'false' ? 'true' : 'false';
			$(evt.currentTarget).attr('aria-expanded', expanded);
		}
	}
});