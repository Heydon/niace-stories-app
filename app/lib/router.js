var animating = false;
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	onRun: function() {
		$('main').attr('class', 'loaded');
		setTimeout(function () {
			$('main').removeAttr('class');
		}, 1000);
		if( !animating ) {
			animating = true;
			$('body').animate({scrollTop:0}, '400', function() {
				animating = false;
			});
		}
		$('main').focus();
		//
		this.next();
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
	return Stories.find( pageQuery( this.params.query.page ) );
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

	this.route('/manage');

	this.route('/me');

	this.route('glossary', {
		path: '/glossary'
	});
	this.route('/story/:_id', {
		name: 'story',
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
		action: function() {
			var random = _.sample( Stories.find().fetch() );
			Router.go( 'story', {_id: random._id} );
		}
	});
	this.route('/manageItem/:_id', {
		name: 'manageItem',
		data: function() {
			return Stories.findOne( this.params._id );
		}
	});

	this.route('/keyword/:keyword', {
		name: 'keyword',
		data: function() {
			return {
				stories: Stories.find( pageQuery(this.params.query.page, {
					keywords: {
						'$in': [this.params.keyword]
					}
				})),
				keyword: this.params.keyword
			};
		}
	});

	this.route('/theme/:_id', {
		name: 'theme',
		data: function() {
			var themes = this.params._id && this.params._id.split(',');
			return {
				stories: Stories.find( pageQuery(this.params.query.page, {
					themes: {
						'$in': themes
					}
				})),
				ids: themes
			};
		}
	});

	this.route('allStories', {
		data: function() {
			return Stories.find();
		}
	});

	this.route('/manageAlerts', {
		name: 'manageAlerts',
		data: function() {
			return Alerts.find();
		}
	});

	this.route('/manageAlert/:_id', {
		name: 'manageAlert',
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

	this.route('manageglossary', {
		name: 'manageGlossary'
	});

	this.route('manageglossaryterm/:_id', {
		name: 'manageGlossaryTerm',
		data: function() {
			if( this.params._id ) {
				return Glossary.findOne( this.params._id );
			}
		}
	});

	this.route('manageglossaryterm', {
		template: 'manageGlossaryTerm'
	});

	this.route('deleteglossaryterm/:_id', {
		name: 'deleteGlossaryTerm',
		data: function() {
			if( this.params._id ) {
				return Glossary.findOne( this.params._id );
			}
		}
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
	only: ['manage', 'manageItem', 'allStories', 'manageAlerts', 'manageGlossary', 'manageGlossaryTerm', 'manageAlerts', 'manageAlert']
});

if( Meteor.isClient ) {
	var sub = false;
	Tracker.autorun(function() {
		if( !sub ) {
			Meteor.subscribe('stories');
			Meteor.subscribe('alerts');
			Meteor.subscribe('config');
			Meteor.subscribe('themes');
			Meteor.subscribe('glossary');

			sub = true;
		}
	});
}
