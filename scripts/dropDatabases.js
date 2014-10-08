var mongoose = require('mongoose');
var hasErrored = 0;
if( process.env.MONGOHQ_URL ) {
	mongoose.connect( process.env.MONGOHQ_URL, function( err ) {
		if( err ) {
			console.error( err );
			hasErrored = 1;
		}
		mongoose.connection.db.dropCollection('themes', function( err ) {
			if( err ) {
				console.error( err );
				hasErrored = 1;
			}
			mongoose.connection.db.dropCollection('stories', function( err ) {
				if( err ) {
					console.error( err );
					hasErrored = 1;
				}
				console.log('Dropped themes and stories from the mongo database');
				hasErrored && console.error('There was an error though');
				process.exit( hasErrored );
			});
		});
	});
} else {
	console.error('Dropping the databases requires a MONGOHQ_URL in the environment');
}