/** The Javascript APIS do not provide this functionality, so we make it. */
if( process.env.SC_CLIENT_ID && process.env.SC_CLIENT_SECRET && process.env.SC_USERNAME && process.env.SC_PASSWORD ) {

	var request = Npm.require('request');
	function Soundcloud( clientID, clientSecret, clientUsername, clientPassword ) {
		if( !(this instanceof Soundcloud) ) return new Soundcloud( clientID, clientSecret, clientUsername, clientPassword );

		// bring on es6 {clientID, clientSecret, clientUsername, clientPassword}
		this.options = {
			clientID: clientID,
			clientSecret: clientSecret,
			clientUsername: clientUsername,
			clientPassword: clientPassword
		};

		return this;
	}
	Soundcloud.url = 'https://api.soundcloud.com';
	Soundcloud.prototype.authed = false;

	// just fucking auth us using https://developers.soundcloud.com/docs/api/guide#user-credentials
	Soundcloud.prototype.auth = function() {
		var sc = this;
		var postData = {
            'client_id': this.options.clientID,
            'client_secret': this.options.clientSecret,
            'username': this.options.clientUsername,
            'password': this.options.clientPassword,
            'grant_type': 'password',
            'scope': 'non-expiring'
		};
		var authDataString = '';
		request.post({
			url: Soundcloud.url + '/oauth2/token',
			qs: postData
		})
			.on('error', function() {
				console.error('Encountered an error trying to connect to the soundcloud api');
				sc.authed = false;
			})
			.on('data', function(d) {
				authDataString += d.toString();
			})
			.on('end', function() {
				sc.authData = JSON.parse( authDataString );
				sc.authData.lastAuthed = Date.now();
				console.log( sc.authData );

				sc.authed = !sc.authData.error;
				if( sc.authed ) {
					console.log( 'Successfully authed against soundcloud API');
				} else {
					console.error( 'unable to auth against soundcloud API: ' + sc.authData.error );
				}
			});
	};

	Soundcloud.prototype.uploadTrackPipe = function() {
		if( this.authed ) {
			var params = {
				client_id: this.options.clientID,
				access_token: this.authData.access_token
			};
			console.log('posting datas');
			console.log( params );
			console.log( this.authData );
			return request.post({
				url: Soundcloud.url + '/tracks',
				qs: params
			});
		} else {
			console.error('Unable to upload track, not authed yet!');
		}
	};

	var sc = new Soundcloud( process.env.SC_CLIENT_ID, process.env.SC_CLIENT_SECRET, process.env.SC_USERNAME, process.env.SC_PASSWORD );
	sc.auth();

	var maxFileUpload = 500 * 1024 * 1024;// 500mb
	//sc.init( process.env.SC_CLIENT_ID, process.env.SC_CLIENT_SECRET, 'http://somefakepath.not-a-domain' );

} else {
	console.warn( 'Soundcloud connectevity requires SC_CLIENT_ID, SC_CLIENT_SECRET, SC_USERNAME and SC_PASSWORD in the application\'s environment' );
	var sc = {
		authed: false
	};
}
// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// 411 Length Required
// The request did not specify the length of its content, which is required by the requested resource.
// 413 Request Entity Too Large
// The request is larger than the server is willing or able to process.
function status( code ) {
	switch( code ) {
		case 201:
		case 200:
			return 'success';
		case 411:
			return 'The request did specify the length of its content';
		case 413:
			return 'The request is too large';
		case 503:
			return 'Unable to contact soundcloud, please try again later';
		case 500:
		default:
			return 'Server error';
	}
}

Router.route('/audio', { where: 'server' })
	.post(function() {
		if( !sc.authed ) {
			var statusCode = 503;
		} else {
			var contentSize = this.request.headers['content-length'] && parseInt(this.request.headers['content-length'], 10);
			// when we finish we need to send a 201, with a "Location" header set
			var statusCode = 200;
			var scResponse = '';
			var audioRequest = this;

			if( contentSize && contentSize < maxFileUpload ) {

				this.request
					.pipe(
						sc.uploadTrackPipe()
							.on('error', function() {
								console.error('error!');
								console.error.apply(console, arguments);
							})
							.on('data', function(d) {
								scResponse += d.toString();
							})
							.on('end', function() {
								console.log('finished request with (' + this.response.statusCode + ')');
								console.log(scResponse);
							})
					)
					.pipe(this.response);

			} else {
				// er
				statusCode = contentSize ? 413 : 411;
			}
		}

		if( statusCode > 399 ) {
			// close the response
			this.response.statusCode = statusCode;
			this.response.end( status(statusCode) );
		}
	});