Alerts = new Meteor.Collection('alerts');
Ground.Collection( Alerts );

Alerts.allow({
	insert: function() {
		return !!Meteor.user();
	},
	update: function() {
		return !!Meteor.user();
	}
});