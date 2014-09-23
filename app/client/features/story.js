Template.story.events({
	'change [name="inspiring"]' : function( e ) {

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