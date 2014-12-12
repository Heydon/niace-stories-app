/**
 * structure
 * {
 * 	title: "some title",
 * 	content: "#markdown"
 * 	keywords: ["money", "family", "relationships"]
 * }
 */
Glossary = new Meteor.Collection('glossary');
Ground.Collection( Glossary );

Glossary.allow({
	insert: function() {
		return !!Meteor.user();
	},
	update: function() {
		return !!Meteor.user();
	},
	remove: function() {
		return !!Meteor.user();
	}
});