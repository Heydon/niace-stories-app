var saveStory = function( id ) {
	if (localStorage.getItem('inspiring') === null) {

		// Create new array of inspiring stories
		var firstStory = [];
		// push the supplied id
		firstStory.push(id);
		// convert to local storage string and save against 'inspiring'
		localStorage.setItem('inspiring', firstStory.toString());

	} else {

		// convert extant string to array of IDs
		var ids = localStorage.getItem('inspiring').split(',');
		// add the new id
		ids.push(id);
		// save updated arrays to 'inspiring'
		localStorage.setItem('inspiring', ids.toString());
	}
};

var deleteStory = function( id ) {
	if (localStorage.getItem('inspiring') !== null) {

		// convert extant string to array of IDs
		var ids = localStorage.getItem('inspiring').split(',');

		// Is the current id already in the 'inspiring' array
		if ( _.contains(ids, id) ) {

			// If so, remove the current id from the set
			var reducedSet = _.reject(ids, function(i) { return i === id; });

			// if that leaves no ids, kill the localStorage item
			if (reducedSet.length === 0) {

				localStorage.removeItem('inspiring');
			
			// or write its string alias back into localStorage
			} else {

				localStorage.setItem('inspiring', reducedSet.toString());

			}
		}
	}
};

Template.inspiringRadios.events({
	'change [name="inspiring"]' : function() {

		var value = $('[name="inspiring"]:checked').val();
		var inspiredMe = value === 'true' ? true : false;

		if (inspiredMe) {
			saveStory(this._id);
			Session.set('message', 'Story saved in <a href="/me">Inspiring Me</a>');
		} else {
			deleteStory(this._id);
			Session.set('message', 'Story removed from <a href="/me">Inspiring Me</a>');
		}

	}
});

Template.deleteLocal.events({
	'click .delete' : function() {

		deleteStory(this.toDelete);
		Router.go('me');
		Session.set('message', this.name +'\'s story deleted from your collection.');

	},
	'click .cancel' : function() {
		Router.go('me');
	}
});

if( Meteor.isClient ) {
	window.deleteStory = deleteStory;
	window.saveStory = saveStory;
}
