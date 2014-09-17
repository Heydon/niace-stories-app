Template.stories.helpers({
	stories: function() {
		return Stories.find({}, {sort: {submitted: -1}});
	}
});

Template.manage.helpers({
	stories: function() {
		return Stories.find();
	}
});

Template.manageitem.helpers({
	themes: function() {
		return Themes.find();
	},
	keywords: function() {
		console.log(Themes.find({themeName: 'Health'}, {fields: {keywords: 1}}));
	},
	currentTheme: function() {
		return this.story.theme;
	},
	checked: function() {
		return this.story.published ? 'checked': '';
	},
	selected: function(parentContext) {
			return this.themeName === parentContext.story.theme ? 'selected' : '';
	}
});

Template.themes.helpers({
	themes: function() {
		return Themes.find();
	}
});

Template.theme.helpers({
	empty: function() {
		if (this.stories.count() === 0) {
			return true;
		}
	}
});

Template.header.helpers({
	loggedIn: function() {
		return Meteor.user() ? true : false;
	}
});

Template.header.events({
	'click .logout': function() {
		Meteor.logout(function() {
			Router.go('/');
		});
	}
});

// handle adding a story

Template.add.events({
	'submit form': function(e) {
		e.preventDefault();
		var story = {
			name: $('#name').val(),
			story: $('#story').val()
		};

		// honeypot to fool spam bots
		if ($('#check').val() !== '') {
			return;
		} else {
			Meteor.call('submit', story, function(error, data) {
				if (data.error) {
					return alert(data.errors);
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

		var name = names[_.random(0, names.length) -1];
		$('#name').val(name);
	}
});

Template.manageitem.events({
	'ready' : function() {
		console.log('ready');
	},
	'submit form': function(e) {
		e.preventDefault();
		
		var isPublished = $('#published').is(':checked') ? true : false;

		var story = {
			id: this.story._id,
			name: $('#name').val(),
			story: $('#story').val(),
			theme: $('#theme').val(),
			published: isPublished
		};

		// honeypot to fool spam bots
		if ($('#check').val() !== '') {
			return;
		} else {
			Meteor.call('edit', story, function(error, data) {
				if (data.errors.length) {
					return alert(data.errors);
				}
				Router.go('edited');
			});
		}
	}
});

Template.loginForm.events({

    'submit #login' : function(e) {

		e.preventDefault();

		var email = $('#email').val();
		var password = $('#password').val();
		email.trim();

		Meteor.loginWithPassword(email, password, function(error) {

			if (error) {
				alert('Error: ' + error.reason);
			} else {
				Router.go('manage');
			}

		});
    }

});

Template.registerForm.events({
    'submit #register' : function(e) {

		e.preventDefault();

		var email = $('#email').val();
		var password = $('#password').val();
		Accounts.createUser({email: email, password : password}, function(error) {

			if (error) {
				alert('Error: ' + error.reason);
			} else {
				return;
			}

		});
    }
 });
