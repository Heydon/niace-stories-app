var themes = new Meteor.Collection('themes');

if( Meteor.isClient ) {
	// make themes globally available
	window.themes = themes;
}