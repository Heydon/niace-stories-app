if( process.env.SC_CLIENT_ID && process.env.SC_CLIENT_SECRET ) {

	var sc = Npm.require('soundclouder');

	sc.init( process.env.SC_CLIENT_ID, process.env.SC_CLIENT_SECRET, 'http://somefakepath.not-a-domain' );

} else {
	console.warn( 'Soundcloud connectevity requires SC_CLIENT_ID and a SC_CLIENT_SECRET in the application\'s environment' );
	var sc = false;
}

Meteor.methods({
	uploadToNiaceSoundcloud: function() {
		if( !sc ) {
			throw new Meteor.error(['Unable to connect to soundcloud']);
		}
	}
});