Alerts = new Meteor.Collection('alerts');
GroundDB( Alerts );

Alerts.allow({
	insert: function() {
		return !!Meteor.user();
	},
	update: function() {
		return !!Meteor.user();
	}
});