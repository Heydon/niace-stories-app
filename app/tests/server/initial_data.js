//tests/server
var assert = require('assert');

suite('Database import', function() {
	test('new database has imported data from the json files', function(done, server) {
		// eval ships this code directly into the server
		server.eval(function() {

			var root = this;
			var dataTypes = {
				Stories: Stories,
				Alerts: Alerts,
				Resources: Resources,
				Themes: Themes
			};

			Object.keys( dataTypes ).forEach(function( type ) {
				emit( type, root[ type ].find().fetch() );
			});

		});

		var counted = 0;
		var dataTypes = {
				Stories: 8,
				Alerts: 4,
				Resources: 12,
				Themes: 7
			};

		Object.keys( dataTypes ).forEach(function( type ) {
			server.once( type, function( data ) {
				var count = dataTypes[ type ];
				assert.equal( data.length, count,
					'expect the number of ' + type + '(' + data.length + ') to match the number found in the json files (' + count + ')' );

				if( ++counted === 4 ) {
					done();
				}
			});
		});

	});
});