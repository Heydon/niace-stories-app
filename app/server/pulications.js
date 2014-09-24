'use strict';

Meteor.publish('stories', function() {
	return Stories.find();
});

Meteor.publish('themes', function() {
	return Themes.find();
});

// Perhaps look to remove these fixture blocks when releasing?..
if( Stories.find().count() === 0 ) {
	try { // 
		var stories = JSON.parse( Assets.getText('stories/stories.json') );
		_.each( stories, function( story, i ) {
			console.log( '\rImporting story ' + (i + 1) + '/' + stories.length );
			Stories.insert( story );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/stories/stories.json' );
	}
}

// Fixture for themes if database empty
if( Themes.find().count() === 0 ) {
	try { // 
		var themes = JSON.parse( Assets.getText('themes/themes.json') );
		_.each( themes, function( story, i ) {
			console.log( '\rImporting theme ' + (i + 1) + '/' + themes.length );
			Stories.insert( story );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/themes/themes.json' );
	}
}