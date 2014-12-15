// default config options
if( !Config.find().count() ) {
	Config.insert({
		_id: 'pageSize',
		value: 10
	});
	Config.insert({
		_id: 'fixture',
		value: false
	});
}

Meteor.publish('stories', function( loggedIn, query, options ) {
	var pageSize = Config.findOne('pageSize').value;

	var page = options && options.page || 0;
	query = query || {};
	if( !loggedIn ) {
		query.published = true;
	}

	if( !Config.findOne('fixture').value ) {
		query.fixture = {
			$exists: false
		};
	}

	if( options ) {
		options = _.omit( options, 'page' );
		options = _.extend({
			sort: {
				submitted: -1
			},
			skip: page * pageSize,
			limit: pageSize
		}, options );
	} else {
		options = {
			sort: {
				submitted: -1
			}
		};
	}

	return Stories.find(query, options);
});

Meteor.publish('themes', function() {
	return Themes.find();
});

Meteor.publish('alerts', function( query ) {
	if( query ) {
		return Alerts.find(query);
	} else {
		return Alerts.find();
	}
});

Meteor.publish('glossary', function() {
	return Glossary.find();
});

Meteor.publish('config', function() {
	return Config.find();
});

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

// Fixture for themes if database empty
if( Themes.find().count() === 0 ) {
	preLoadDatabase('data/themes.json', Themes);
}

// Fixture for resources if database empty
if( Glossary.find().count() === 0 ) {
	preLoadDatabase('data/glossary.json', Glossary);
}

if( Alerts.find().count() === 0 ) {
	preLoadDatabase('data/alerts.json', Alerts);
}
