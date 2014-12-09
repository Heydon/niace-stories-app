if( Meteor.isClient ) {
	var sub = false;
	Tracker.autorun(function() {
		if( !sub ) {
			Meteor.subscribe('stories', Meteor.user());
			Meteor.subscribe('alerts');
			Meteor.subscribe('config');
			sub = true;
		}
	});
}

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
		$('html').animate({scrollTop:0}, '400');
		$('main').focus();
	}
});

function pageQuery( page, conf ) {
	var pageSize = Config.findOne('pageSize') ? Config.findOne('pageSize').value : 10;
	return _.extend({
		skip: page * pageSize,
		limit: pageSize
	}, conf);
}

function dataStories() {
	return Stories.find( pageQuery( this.params.page ) );
}

function dataStoryWithID() {
	return Stories.findOne( this.params._id );
}

function dataStory() {
	return Stories.find();
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
		path: '/manage'
	});

	this.route('me', {
		path: '/me'
	});

	this.route('story', {
		path: '/story/:_id',
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
		data: dataStory,
		action: function() {
			var random = _.sample( Stories.find().fetch() );
			Router.go( 'story', {_id: random._id} );
		}
	});
	this.route('manageItem', {
		path: '/manageItem/:_id',
		data: dataStoryWithID,
		data: function() {
			return {
				story: Stories.findOne( this.params._id )
			};
		}
	});

	this.route('keyword', {
		path: '/keyword/:keyword',
		data: function() {
			return {
				stories: Stories.find( pageQuery(this.params.page, {
					keywords: {
						'$in': [this.params.keyword]
					}
				})),
				keyword: this.params.keyword
			};
		}
	});

	this.route('theme', {
		path: '/theme/:_id',
		data: function() {
			var themes = this.params._id && this.params._id.split(',');
			return {
				stories: Stories.find( pageQuery(this.params.page, {
					themes: {
						'$in': themes
					}
				})),
				ids: themes
			};
		}
	});

	this.route('allStories', {
		data: dataStory
	});

	this.route('manageAlerts', {
		path: '/manageAlerts',
		data: function() {
			return Alerts.find();
		}
	});

	this.route('manageAlert', {
		path: '/manageAlert/:_id',
		data: function() {
			if( this.params._id ) {
				return Alerts.findOne( this.params._id );
			}
			return {};
		}
	});

	this.route('manageAlert', { path: '/manageAlert' });

	this.route('manageResources', {
		path: 'resources'
	});

	this.route('manageResource', {
		path: 'resource/:_id',
		data: function() {
			if( this.params._id ) {
				return Resources.findOne( this.params._id );
			}
		}
	});
	this.route('manageResource', {path: 'resource'});

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

Router.onBeforeAction(requireLogin, {only: ['manage', 'manageItem', 'allStories', 'manageAlerts', 'manageResources']});
