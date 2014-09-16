'use strict';

Meteor.publish('stories', function() {
	return Stories.find({published: true});
});

Meteor.publish('themes', function() {
	return Themes.find();
});

// Fixture for themes if database empty

if( Themes.find().count() === 0 ) {
	Themes.insert({
		'themeName' : 'Money',
		'slug'		: 'money',
		'keywords'	: ['budgeting', 'banking', 'student loans']
	});
	Themes.insert({
		'themeName' : 'Identity',
		'slug'		: 'identity',
		'keywords'	: ['background', 'values']
	});
	Themes.insert({
		'themeName' : 'Learning',
		'slug'		: 'learning',
		'keywords'	: ['courses', 'school', 'volunteering', 'apprenticeships']
	});
	Themes.insert({
		'themeName' : 'Relationships',
		'slug'		: 'relationships',
		'keywords'	: ['friends', 'family', 'key workers']
	});
	Themes.insert({
		'themeName' : 'Health',
		'slug'		: 'health',
		'keywords'	: ['mental health', 'diet', 'exercise', 'appointments'],
	});
}