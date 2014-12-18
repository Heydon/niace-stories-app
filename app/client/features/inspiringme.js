function getInspiringStories() {
	// Create new array of inspiring stories
	var inspiring = ReactiveStore.get('inspiring') || [];

	return typeof inspiring === 'string' ? inspiring.split(',') : inspiring;
}

function saveInspiringStory( id ) {
	var inspiring = getInspiringStories();

	// add the new id if we haven't already
	if( _.indexOf( inspiring, id ) === -1 ) {
		inspiring.push( id );
	}

	// save inspiring stories
	ReactiveStore.set('inspiring', inspiring);
}

function removeInspiringStory( id ) {
	var inspiring = getInspiringStories();

	inspiring = _.without( inspiring, id );

	ReactiveStore.set('inspiring', inspiring);
}

Template.inspiringRadios.events({
	'change [name="inspiring"]' : function() {

		var value = $('[name="inspiring"]:checked').val();
		var inspiredMe = value === 'true' ? true : false;

		if (inspiredMe) {
			saveInspiringStory(this._id);
			Session.set('message', 'Story saved in <a href="/me">My Favourites</a>');
		} else {
			removeInspiringStory(this._id);
			Session.set('message', 'Story removed from <a href="/me">My Favourites</a>');
		}

	}
});

Template.deleteLocal.events({
	'click .delete' : function() {

		removeInspiringStory(this.toDelete);
		Router.go('me');
		Session.set('message', this.name +'\'s story deleted from your collection.');

	},
	'click .cancel' : function() {
		Router.go('me');
	}
});

if( Meteor.isClient ) {
	window.removeInspiringStory = removeInspiringStory;
	window.saveInspiringStory = saveInspiringStory;
	window.getInspiringStories = getInspiringStories;
}
