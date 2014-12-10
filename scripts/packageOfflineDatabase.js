var MongoClient = require('mongodb').MongoClient;
var hasErrored = 0;
if( process.env.MONGOHQ_URL ) {
	process.stdout.write('GroundDB.')
	MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
		if( err ) throw err;

		var collection = db
			.collection('stories')
			.find({
				published: true
			})
			.toArray(function( err, docs ) {
				console.log( docs );
			});
	});
}