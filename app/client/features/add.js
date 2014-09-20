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
				if( data.errors ) {
					// set the errors session variable with the method errors array
					Session.set('errors', data.errors);
					// take user to start of form, which may be obscured, to read errors
					$('#add').focus();
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

// helper to display the errors from the session
Template.add.helpers({
	errors: function() {
		return Session.get('errors');
	}
});

// the destroy method clears errors so they are not there 
// when returning to the page
Template.add.destroyed = function(){
  Session.set('errors', null);
}