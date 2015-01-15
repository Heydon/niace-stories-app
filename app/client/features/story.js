Template.inspiringRadios.events({
	'change [name="inspiring"]' : function( e ) {

		var value = $('[name="inspiring"]:checked').val();
		var inspiredMe = value === 'true' ? true : false;

		if (inspiredMe) {
			saveInspiringStory(this._id);
			Session.set('message', 'Story added to <a href="/me">My Favourites</a>');
		} else {
			removeInspiringStory(this._id);
		}

	}
});