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
	Themes.insert({
		'themeName' : 'Money',
		'slug'		: 'money',
		'keywords'	: ['budgeting', 'banking', 'student loans'],
		'description' : 'Learning how to handle money is a big step towards achieving independence'
	});
	Themes.insert({
		'themeName' : 'Identity',
		'slug'		: 'identity',
		'keywords'	: ['background', 'values'],
		'description' : 'It helps to know who you are before you can decide what you want to do!'
	});
	Themes.insert({
		'themeName' : 'Learning',
		'slug'		: 'learning',
		'keywords'	: ['courses', 'school', 'volunteering', 'apprenticeships'],
		'description' : 'There are lots of choices when it comes to education. Read people\'s experiences'
	});
	Themes.insert({
		'themeName' : 'Relationships',
		'slug'		: 'relationships',
		'keywords'	: ['friends', 'family', 'key workers'],
		'description' : 'Whether we\'re talking family or romance, relationships are a big part of our lives'
	});
	Themes.insert({
		'themeName' : 'Health',
		'slug'		: 'health',
		'keywords'	: ['mental health', 'diet', 'exercise', 'appointments'],
		'description' : 'It\'s hard to get on when you\'re not feeling it physically. Mental health is also important'
	});
}