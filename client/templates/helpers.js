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

Template.manageitem.currentTheme = function() {
	return this.theme;
}

Template.manageitem.helpers({
	themes: function() {
		return Themes.find();
	},
	currentTheme: function() {
		return this.story.themes;
	},
	checked: function() {
		return this.story.published ? 'checked': '';
	},
	selected: function(parentContext) {
			return this.themeName === parentContext.story.theme ? "selected" : '';
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

// handle adding a story

Template.add.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var story = {
			name: $('#name').val(),
			story: $('#story').val()
		}

		// honeypot to fool spam bots
		if ($('#check').val() !== '') {
			return;
		} else {
			Meteor.call('submit', story, function(error, data) {
				if (data.error) {
					return alert(data.error);
				}
				Router.go('thanks', {_id: data.id});
			});
		}
	},
	'click .random': function(e) {
		e.preventDefault();
		var names = [
			"Ali", 
			"Albi", 
			"Alex", 
			"George", 
			"Fan",
			"Freddie", 
			"Frankie", 
			"Narin", 
			"Jordan", 
			"Sasha", 
			"Robin", 
			"Ronnie", 
			"Sam", 
			"Charlie",
			"Reese",
			"Taylor",
			"Sid"
		];

		var name = names[_.random(0, names.length) -1];
		$('#name').val(name);
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
				alert("Error: " + error.reason);
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
				alert("Error: " + error.reason);
			} else {
				return;
			}

		});
    }
 });
