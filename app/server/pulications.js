'use strict';

// TODO move this to a config variable
var pageSize = 10;

Meteor.publish('stories', function( loggedIn, query, options ) {
	var page = options && options.page || 0;
	query = query || {};
	if( !loggedIn ) {
		query.published = true;
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

Meteor.publish('resources', function() {
	return Resources.find();
});

function preLoadDatabase( file, Type ) {
	try { // 
		console.log( 'Attempting to import database entries from private/' + file );
		var entries = JSON.parse( Assets.getText( file ) );
		_.each( entries, function( data, i ) {
			console.log( 'Importing story ' + (i + 1) + '/' + entries.length );
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
if( Resources.find().count() === 0 ) {
	preLoadDatabase('data/resources.json', Resources);
}

if( Alerts.find().count() === 0 ) {
	preLoadDatabase('data/alerts.json', Alerts);
}
