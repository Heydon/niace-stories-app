Template.registerForm.events({
	'submit #register': function(e) {

		e.preventDefault();

		var email = $('#email').val();
		var password = $('#password').val();
		Accounts.createUser({email: email, password : password}, function(error) {

			if( error ) {
				alert('Error: ' + error.reason);
			} else {
				return;
			}

		});
	}
});