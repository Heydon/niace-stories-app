Alerts = new Meteor.Collection('alerts');

Alerts.allow({
	insert: function() {
		return !!Meteor.user();
	}
});