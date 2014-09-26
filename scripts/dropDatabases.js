var mongoose = require('mongoose');

if( process.env.MONGOHQ_URL ) {
	mongoose.connect( process.env.MONGOHQ_URL );
	mongoose.connection.db.dropCollection('themes');
	mongoose.connection.db.dropCollection('stories');
	console.log('Dropped themes and stories from the mongo database');
} else {
	console.error('Dropping the databases requires a MONGOHQ_URL in the environment');
}