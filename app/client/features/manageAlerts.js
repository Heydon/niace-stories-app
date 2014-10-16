Template.manageAlerts.helpers({
	alerts: function() {
		return Alerts.find();
	},
	untitled: function() {
		if (!this.title) {
			return 'Untitled ';
		}
	}
});

Template.manageAlert.rendered = function() {
	$('textarea').autosize();
};

Template.manageAlert.helpers({
	availablePaths: function() {
		return Router.routes;
	},

	safePath: function() {
		return this.originalPath && this.originalPath.replace(/\/|:|\ /g, '_') || '';
	},

	notAccountedFor: function() {
		if( this && this.paths ) {
			var routes = _.pluck( Router.routes, 'originalPath' );
			return _.difference( this.paths, routes ).join(',');
		}
		return '';
	},

	pathSelected: function( parentScope ) {
		if( parentScope && parentScope.paths ) {
			return _.indexOf( parentScope.paths, this.originalPath ) > -1 ? 'checked' : '';
		}
		return '';
	}
});

function constructAlertObjectFromForm( $form ) {
	var alert = {};

	var paths = $form.find('.paths input').map(function() {
		switch( this.name ) {
			case 'custom-paths':
				return this.value ? this.value.split(',') : '';
			default:
				return this.checked ? this.value : '';
		}
	});

	alert.paths = _.chain( paths )
		// remove dupes
		.unique()
		// remove falsey values ( empty strings, undefined, etc )
		.filter( Boolean )
		.value();

	_.each(['title', 'content', 'okButton'], function( v ) {
		alert[v] = $form.find('[name="' + v + '"]').val();
	});

	return alert;
}

Template.manageAlert.events({
	'submit form': function( evt, template ) {
		var $form = $( evt.currentTarget );

		evt.preventDefault();

		if( template.data && template.data._id ) {
			Alerts.update( template.data._id, {
				$set: constructAlertObjectFromForm( $form )
			});
		} else {
			Alerts.insert( constructAlertObjectFromForm( $form ) );
		}

		Session.set('message', 'Alert saved!');
		Router.go('/manageAlerts');
	}
});