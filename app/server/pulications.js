// default config options
if( !Config.find().count() ) {
	Config.insert({
		_id: 'pageSize',
		value: 10
	});
	Config.insert({
		_id: 'fixture',
		value: false
	});
}

Meteor.publish('stories', function( query, options ) {
	var pageSize = Config.findOne('pageSize').value;

	var page = options && options.page || 0;
	query = query || {};

	if( !this.userId || !Meteor.users.findOne( this.userId ) ) {
		query.published = true;
	}

	if( !Config.findOne('fixture').value ) {
		query.fixture = {
			$exists: false
		};
	}

	if( options ) {
		options = _.omit( options, 'page' );
		options = _.extend({
			sort: {
				submitted: -1
			},
			skip: page * pageSize,
			limit: pageSize
		}, options );
	} else {
		options = {
			sort: {
				submitted: -1
			}
		};
	}
	return Stories.find(query, options);
});

Meteor.publish('themes', function() {
	return Themes.find();
});

Meteor.publish('alerts', function( query ) {
	if( query ) {
		return Alerts.find(query);
	} else {
		return Alerts.find();
	}
});

Meteor.publish('glossary', function() {
	return Glossary.find();
});

Meteor.publish('config', function() {
	return Config.find();
});
