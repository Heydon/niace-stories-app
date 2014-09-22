'use strict';

Meteor.publish('stories', function() {
	return stories.find();
});

Meteor.publish('themes', function() {
	return themes.find();
});

// Meteor.AppCache.config({
// 	onlineOnly: ['/add', '/manage', '/thanks', '/login']
// });

// Fixture for themes if database empty

if( themes.find().count() === 0 ) {
	themes.insert({
		'themeName' : 'Money',
		'slug'		: 'money',
		'keywords'	: ['budgeting', 'banking', 'student loans'],
		'description' : 'Learning how to handle money is a big step towards achieving independence'
	});
	themes.insert({
		'themeName' : 'Identity',
		'slug'		: 'identity',
		'keywords'	: ['background', 'values'],
		'description' : 'It helps to know who you are before you can decide what you want to do!'
	});
	themes.insert({
		'themeName' : 'Learning',
		'slug'		: 'learning',
		'keywords'	: ['courses', 'school', 'volunteering', 'apprenticeships'],
		'description' : 'There are lots of choices when it comes to education. Read people\'s experiences'
	});
	themes.insert({
		'themeName' : 'Relationships',
		'slug'		: 'relationships',
		'keywords'	: ['friends', 'family', 'key workers'],
		'description' : 'Whether we\'re talking family or romance, relationships are a big part of our lives'
	});
	themes.insert({
		'themeName' : 'Health',
		'slug'		: 'health',
		'keywords'	: ['mental health', 'diet', 'exercise', 'appointments'],
		'description' : 'It\'s hard to get on when you\'re not feeling it physically. Mental health is also important'
	});
}