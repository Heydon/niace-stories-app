Template.loginForm.events({

	'submit #login': function(e) {

		e.preventDefault();

		var email = $('#email').val();
		var password = $('#password').val();
		email.trim();

		Meteor.loginWithPassword(email, password, function(error) {
			if( error ) {
				alert('Error: ' + error.reason);
			} else {
				Router.go('manage');
			}
		});
	}

});