function alertsIn() {
	var activeRoute = Router.current();
	var searchInRoutes = [];

	searchInRoutes.push( activeRoute.path );
	if( activeRoute.route ) {
		searchInRoutes.push( activeRoute.route.originalPath );
	}
	return searchInRoutes;
}

Template.alertBubbles.helpers({
	alerts: function() {
		if( Meteor.user() ) {
			return [];
		}
		return Alerts.find({
			_id: {
				'$in': alertsIn(),
				'$nin': ReactiveStore.get('viewedAlerts') || []
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