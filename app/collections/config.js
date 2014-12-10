/**
 * This is the config collection
 * the data takes the format:
 * {
 * 		_id: 'name of the config item',
 * 		value: 'theValue'
 * }
 */
Config = new Meteor.Collection('config');
GroundDB( Config );

Config.allow({
	insert: function() {
		return false;
	},
	update: function() {
		return false;
	},
	remove: function() {
		return false;
	},
	fetch: ['owner'],
	transform: function() {
		return false;
	}
});