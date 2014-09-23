Meteor.startup(function() {

	Meteor.subscribe('themes');

	window.themes = new GroundDB( themes );
	window.stories = new GroundDB( stories );

	if( Meteor.isCordova ) {
		Meteor.disconnect();
	}
});