function alertsIn() {
	var activeRoute = Router.current();

	return [activeRoute.route._path, activeRoute.location.get().path];
}

Template.alertBubbles.helpers({
	alerts: function() {
		return Alerts.find({
			_id: {
				'$nin': ReactiveStore.get('viewedAlerts') || []
			},
			paths: {
				'$in': alertsIn()
			}
		});
	}
});

Template.alertBubbles.events({
	'click .alert-bubble button': function( evt ) {
		var seen = ReactiveStore.get('viewedAlerts') || [];
		var $el = $( evt.currentTarget );
		seen.push( $el.data('alertId') );

		ReactiveStore.set('viewedAlerts', seen);
	}
});