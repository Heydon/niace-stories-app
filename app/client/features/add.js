Template.add.rendered = function() {
	$('textarea').autosize();
};

Template.add.events({
	'submit form': function(e) {
		e.preventDefault();
		// create candidate story object
		var story = {
			name: $('#name').val(),
			story: $('#story').val()
		};
		// honeypot to fool spam bots
		if( $('#check').val() !== '' ) {
			return;
		} else {
			// call the share method for stories
			Meteor.call('share', story, function(errors, data) {
				if( errors ) {
					// set the errors session variable with the method errors array
					Session.set( 'errors', errors.reason );
				} else {
					// nullify the residual errors from previous attempts
					Session.set('errors', null);
					Router.go('thanks', {_id: data.id});
				}
			});
		}
	}
});
