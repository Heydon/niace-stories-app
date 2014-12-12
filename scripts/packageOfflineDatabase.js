var MongoClient = require('mongodb').MongoClient;
var template = [
	'if( Meteor.isClient ) {'
];
var meta = {
	stories: {
		published: true
	},
	alerts: {

	},
	config: {

	},
	themes: {

	}
};
if( process.env.MONGOHQ_URL ) {
	MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
		if( err ) throw err;

		db
			.collection('stories')
			.find({
				published: true
			})
			.toArray(function( err, docs ) {
				console.log( docs );
			});
	});
}