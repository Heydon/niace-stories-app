// This file is no longer needed, I think it could be uncommented if we need to load them from fixture files.
// but from now on the data will be loaded from the database found in heroku and
// in the client when offline.
// the script found at scripts/packageOfflineDatabase.js will generate the front end script
// required to populate the minimongo db when we start offline (E.G in a cordova app)

/**
 * TODO: Move this to an import button, so we don't _always_ mess with the database
 * This function takes a file and a datatype and imports the file into the datatype
 * @param  {string} file the file path from app/private/
 * @param  {Collection} Type the collection constructor
 */
function preLoadDatabase( file, Type ) {
	try { // 
		console.log( 'Attempting to import database entries from private/' + file );
		var entries = JSON.parse( Assets.getText( file ) );
		_.each( entries, function( data, i ) {
			console.log( 'Importing data from ' + file + ' ' + (i + 1) + '/' + entries.length );
			Type.insert( data );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/' + file );
	}
}

// Perhaps look to remove these fixture blocks when releasing?..
if( Stories.find().count() === 0 ) {
	preLoadDatabase('data/stories.json', Stories);
	preLoadDatabase('data/real_stories.json', Stories);
}

// // Fixture for themes if database empty
// if( Themes.find().count() === 0 ) {
// 	preLoadDatabase('data/themes.json', Themes);
// }

// // Fixture for resources if database empty
// if( Resources.find().count() === 0 ) {
// 	preLoadDatabase('data/resources.json', Resources);
// }

// if( Alerts.find().count() === 0 ) {
// 	preLoadDatabase('data/alerts.json', Alerts);
// }
