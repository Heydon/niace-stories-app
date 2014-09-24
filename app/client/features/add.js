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
	},
	// generate a random name from an array
	'click .random': function(e) {
		e.preventDefault();
		var names = [
			'Ali', 
			'Albi', 
			'Alex', 
			'George', 
			'Fan',
			'Freddie', 
			'Frankie', 
			'Narin', 
			'Jordan', 
			'Sasha', 
			'Robin', 
			'Ronnie', 
			'Sam', 
			'Charlie',
			'Reese',
			'Taylor',
			'Sid'
		];

		var name = names[_.random( 0, names.length -1 )];
		$('#name').val(name);
	}
});
