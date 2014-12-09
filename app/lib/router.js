Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('alerts', {
			paths: {
				$in: [this.route._path, this.location.get().path]
			}
		});
	},
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
		$('html, body').animate({scrollTop:0}, '400');
		$('main').focus();
		//
		this.next();
	}
});

function waitOnStories() {
	return Meteor.subscribe('stories', Meteor.user(), {}, {
		page: this.params.query.page
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
	this.route('/add');
	this.route('/thanks');
	this.route('/edited');
	this.route('/themes');
	this.route('/', function() {
		this.render('themes');
	}, {
		name: 'home'
	});
	this.route('/login');
	this.route('/register');

	this.route('/manage', {
		waitOn: waitOnStories
	});

	this.route('/me', {
		waitOn: function() {
			return Meteor.subscribe('stories', Meteor.user(), {
				_id: {
					$in: ReactiveStore.get('inspiring') || []
				}
			});
		}
	});

	this.route('/story/:_id', {
		name: 'story',
		waitOn: waitOnStoryWithID,
		data: function() {
			return Stories.findOne(this.params._id);
		}
	});
	this.route('/deleteLocal/:_id/:name', {
		name: 'deleteLocal',
		data: function() {
			return {
				toDelete : this.params._id,
				name : this.params.name
			};
		}
	});
	this.route('/random', {
		name: 'random',
		waitOn: waitOnStory,
		action: function() {
			var random = _.sample( Stories.find().fetch() );
			Router.go( 'story', {_id: random._id} );
		}
	});
	this.route('/manageItem/:_id', {
		name: 'manageItem',
		waitOn: waitOnStoryWithID,
		data: function() {
			return {
				story: Stories.findOne( this.params._id )
			};
		}
	});

	this.route('/keyword/:keyword', {
		name: 'keyword',
		waitOn: function() {
			return Meteor.subscribe('stories', Meteor.user(), {
				keywords: {
					'$in': [this.params.keyword]
				}
			}, {
				page: this.params.query.page
			});
		},
		data: function() {
			return {
				stories: Stories.find(),
				keyword: this.params.query.keyword
			};
		}
	});

	this.route('/theme/:_id', {
		name: 'theme',
		waitOn: function() {
			var themes = this.params._id && this.params._id.split(',');
			return Meteor.subscribe('stories', Meteor.user(), {
				themes: {
					$in: themes
				}
			}, {
				page: this.params.page
			});
		},
		data: function() {
			return {
				ids: this.params._id && this.params._id.split(',')
			};
		}
	});

	this.route('allStories', {
		waitOn: waitOnStory
	});

	this.route('/manageAlerts', {
		name: 'manageAlerts',
		waitOn: function() {
			return Meteor.subscribe('alerts');
		},
		data: function() {
			return Alerts.find();
		}
	});

	this.route('/manageAlert/:_id', {
		name: 'manageAlert',
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

	this.route('/manageAlert', {
		template: 'manageAlert',
		name: 'addAlert'
	});

	this.route('/resources', {
		name: 'manageResources'
	});

	this.route('/resource/:_id', {
		name: 'manageResource',
		data: function() {
			if( this.params._id ) {
				return Resources.findOne( this.params._id );
			}
		}
	});
	this.route('/resource', {
		template: 'manageResource',
		name: 'addResource'
	});

});

var requireLogin = function() {
	if( !Meteor.user() ) {
		if( Meteor.loggingIn() ) {
			this.render('loading');
			this.next();
		} else {
			this.render('login');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {
	only: ['manage', 'manageItem', 'allStories', 'manageAlerts', 'manageResources']
});
