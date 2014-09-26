'use strict';

// TODO 
var pageSize = 10;

Meteor.publish('stories', function( loggedIn, page ) {
	var query = {};
	if( !loggedIn ) {
		query.published = true;
	}
	page = page || 0;
	return Stories.find(query, {
		sort: {
			submitted: -1
		},
		skip: page * pageSize,
		limit: pageSize
	});
});

Meteor.publish('themes', function() {
	return Themes.find();
});

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