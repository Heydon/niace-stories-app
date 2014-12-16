if( process.env.SC_CLIENT_ID && process.env.SC_CLIENT_SECRET ) {

	var sc = Npm.require('soundclouder');

	sc.init( process.env.SC_CLIENT_ID, process.env.SC_CLIENT_SECRET, 'http://somefakepath.not-a-domain' );

} else {
	console.warn( 'Soundcloud connectevity requires SC_CLIENT_ID and a SC_CLIENT_SECRET in the application\'s environment' );
	var sc = false;
}

Router.route('/audio', { where: 'server' })
	.post(function() {
		debugger;
		this.response.end('somestuff');
	});