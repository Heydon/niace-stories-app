Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
	}
});

function waitOnStories() {
	return Meteor.subscribe('stories', Meteor.user(), {}, {
		page: this.params.page
	});
}

function waitOnStory() {
	return Meteor.subscribe('stories', Meteor.user());
}

Router.map(function() {
	this.route('me', { 
		path: '/me',
		waitOn: waitOnStory
	});
	this.route('add', { path: '/add' });
	this.route('thanks', { path: '/thanks' });
	this.route('edited', { path: '/edited' });
	this.route('themes', { path: '/themes' });
	this.route('themes', {path: '/'});

	this.route('login', { path: '/login' });
	this.route('register', { path: '/register' });

	this.route('manage', { 
		path: '/manage',
		waitOn: waitOnStories
	});

	this.route('story', {
		path: '/story/:_id',
		waitOn: waitOnStory,
		data: function() {
			return Stories.findOne(this.params._id);
		}
	});
	this.route('deleteLocal', {
		path: '/deleteLocal/:_id/:name',
		data: function() {
			return {
				toDelete : this.params._id,
				name : this.params.name
			};
		}
	});
	this.route('random', {
		path: '/random',
		waitOn: waitOnStory,
		action: function() {
			var random = _.sample( Stories.find().fetch() );
			Router.go( 'story', {_id: random._id} );
		}
	});
	this.route('manageItem', {
		path: '/manageItem/:_id',
		waitOn: waitOnStory,
		data: function() {
			return {
				story: Stories.findOne( this.params._id )
			};
		}
	});

	this.route('keyword', {
		path: '/keyword/:keyword',
		waitOn: function() {
			return Meteor.subscribe('stories', Meteor.user(), {
				keywords: {
					'$in': [this.params.keyword]
				}
			}, {
				page: this.params.page
			});
		},
		data: function() {
			return {
				stories: Stories.find(),
				keyword: this.params.keyword
			};
		}
	});

	this.route('theme', {
		path: '/theme/:_id',
		waitOn: function() {
			return Meteor.subscribe('stories', Meteor.user(), {
				theme: this.params._id
			}, {
				page: this.params.page
			});
		}
	});

	this.route('allStories', {
		waitOn: waitOnStory
	});

});

Router.onBeforeAction('loading');

var requireLogin = function(pause) {
	if( !Meteor.user() ) {
		if( Meteor.loggingIn() ) {
			this.render('loading');
		} else {
			this.render('login');
			pause();
		}
	}
};

Router.onBeforeAction(requireLogin, {only: ['manage', 'manageItem', 'allStories']});
