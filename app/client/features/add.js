Template.add.events({
	'submit form': function(e) {
		e.preventDefault();
		var story = {
			name: $('#name').val(),
			story: $('#story').val()
		};

		// honeypot to fool spam bots
		if( $('#check').val() !== '' ) {
			return;
		} else {
			Meteor.call('submit', story, function(error, data) {
				if( error ) {
					return alert( error.reason );
				}
				Router.go('thanks', {_id: data.id});
			});
		}
	},
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