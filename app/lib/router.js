Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
	},
	waitOn: function () {
		return Meteor.subscribe('stories', Meteor.user(), this.params.page || 0);
	}
});

Router.map(function() {
	this.route('themes', {path: '/'});
	this.route('me', { path: '/me'});
	this.route('add', { path: '/add' });
	this.route('thanks', { path: '/thanks' });
	this.route('manage', { path: '/manage' });
	this.route('edited', { path: '/edited' });
	this.route('themes', { path: '/themes' });

	this.route('login', { path: '/login' });
	this.route('register', { path: '/register' });

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
		action: function() {
			var random = _.sample( Stories.find().fetch() );
			Router.go( 'story', {_id: random._id} );
		}
	});
	this.route('manageItem', {
		path: '/manageItem/:_id',
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
				stories: Stories.find({
					keywords: {
						'$in': ['banking']
					}
				}),
				keyword: this.params.keyword
			};
		}
	});

	this.route('theme', {
		path: '/theme/:_id',
		data: function() {
			return {
				id: this.params._id,
				query: {
					theme: this.params._id
				}
			};
		}
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

Router.onBeforeAction(requireLogin, {only: ['manage', 'manageItem']});
