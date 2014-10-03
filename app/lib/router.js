Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('alerts', {
			paths: {
				$in: [this.path, this.route.originalPath]
			}
		});
	},
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
		$('html').animate({scrollTop:0}, '400');
		$('main').focus();
	}
});

function waitOnStories() {
	return Meteor.subscribe('stories', Meteor.user(), {}, {
		page: this.params.page
	});
}

function waitOnStoryWithID() {
	return Meteor.subscribe('stories', Meteor.user(), {
		_id: this.params._id
	});
}

function waitOnStory() {
	return Meteor.subscribe('stories', Meteor.user());
}

Router.map(function() {
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

	this.route('me', {
		path: '/me',
		waitOn: function() {
			return Meteor.subscribe('stories', Meteor.user(), {
				_id: {
					$in: ReactiveStore.get('inspiring') || []
				}
			});
		}
	});

	this.route('story', {
		path: '/story/:_id',
		waitOn: waitOnStoryWithID,
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
		waitOn: waitOnStoryWithID,
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

	this.route('manageAlerts', {
		path: '/manageAlerts',
		waitOn: function() {
			return Meteor.subscribe('alerts');
		},
		data: function() {
			return Alerts.find();
		}
	});

	this.route('manageAlert', {
		path: '/manageAlert/:_id',
		waitOn: function() {
			if( this.params._id ) {
				return Meteor.subscribe('alerts', {
					_id: this.params._id
				});
			}
			return {};
		},
		data: function() {
			if( this.params._id ) {
				return Alerts.findOne( this.params._id );
			}
			return {};
		}
	});

	this.route('manageAlert', { path: '/manageAlert' });

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

Router.onBeforeAction(requireLogin, {only: ['manage', 'manageItem', 'allStories', 'manageAlerts']});
