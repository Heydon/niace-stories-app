if( process.env.SC_CLIENT_ID && process.env.SC_CLIENT_SECRET ) {

	var sc = Npm.require('soundclouder');
	var maxFileUpload = 500 * 1024 * 1024;// 500mb
	sc.init( process.env.SC_CLIENT_ID, process.env.SC_CLIENT_SECRET, 'http://somefakepath.not-a-domain' );

} else {
	console.warn( 'Soundcloud connectevity requires SC_CLIENT_ID and a SC_CLIENT_SECRET in the application\'s environment' );
	var sc = false;
}
// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// 411 Length Required
// The request did not specify the length of its content, which is required by the requested resource.
// 413 Request Entity Too Large
// The request is larger than the server is willing or able to process.
function status( code ) {
	switch( code ) {
		case 200:
			return 'success';
		case 411:
			return 'The request did specify the length of its content';
		case 413:
			return 'The request is too large';
		case 500:
		default:
			return 'Server error';
	}
}

Router.route('/audio', { where: 'server' })
	.post(function() {
		var contentSize = this.request.headers['content-length'] && parseInt(this.request.headers['content-length'], 10);
		// when we finish we need to send a 201, with a "Location" header set
		var statusCode = 200;
		var buffer = new Buffer(0);

		if( contentSize && contentSize < maxFileUpload ) {
			this.request.on('data', function() {
				console.log('data');
				debugger;
			});

		} else {
			// er
			statusCode = contentSize ? 413 : 411;
		}
		debugger;
		this.response.end( status( statusCode ) );
	});