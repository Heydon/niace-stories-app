Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	waitOn: function () {
		return Meteor.subscribe('stories');
	}  
});

Router.map(function() {  
	this.route('stories', {path: '/'});
	this.route('me', {path: '/me'});
	this.route('story', {
		path: '/story/:_id',
		data: function() {
			return Stories.findOne(this.params._id);
		}
	});
	this.route('add', {
		path: '/add'  
	});
	this.route('thanks', {path: '/thanks'});
	this.route('manage', {
		path: '/manage'
	});
	this.route('manageitem', {
		path: '/manageitem/:_id',
		data: function() {
			return { 
				story: Stories.findOne(this.params._id)
			};
		}
	});
	this.route('edited', {
		path: '/edited'
	});
	this.route('themes', {
		path: '/themes'
	});
	this.route('theme', {
		path: '/theme/:themeName',
		data: function() {
			return {
				name: this.params.themeName,
				stories: Stories.find({theme: this.params.themeName})
			};
		}
	});
	this.route('login', {
		path: '/login'
	});
	this.route('register', {
		path: '/register'
	});
});

Router.onBeforeAction('loading');


var requireLogin = function(pause) {
	if(! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render('loading');
		} else {
			this.render('login');
			pause();
		}
	}
};

Router.onBeforeAction(requireLogin, {only: ['manage', 'manageitem']});
