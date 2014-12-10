/**
 * structure
 * {
 * 	title: "some title",
 * 	content: "#markdown"
 * 	keywords: ["money", "family", "relationships"]
 * }
 */
Resources = new Meteor.Collection('resources');
GroundDB( Resources );

Resources.allow({
	insert: function() {
		return !!Meteor.user();
	},
	update: function() {
		return !!Meteor.user();
	}
});