Template.manageItem.created = function() {
	this.selectedThemes = new ReactiveVar();
	this.selectedThemes.set( this.data.themes || [] );
};

Template.manageItem.rendered = function() {
	$('textarea').autosize();
};

function val( el ) {return el.value;}

function scrapeStoryData( $form ) {
	var story = {};

	story.themes = _.map( $form.find('[name="themes"] .enable-theme:checked'), val );
	story.keywords = _.map( $form.find('[name="themes"] .keywords :checked'), val );

	_.each( ['name', 'story', 'help', 'audio'], function( prop ) {
		story[ prop ] = $form.find('[name="' + prop + '"]').val();
	});

	story.published = $form.find('[name="published"]').is(':checked');

	return story;
}

Template.manageItem.events({
	'change [name="themes"] .enable-theme': function( evt, template ) {
		var $checkbox = $( evt.currentTarget );
		var themes = template.selectedThemes.get();
		var thisTheme = $checkbox.val();

		if( $checkbox.is(':checked') ) {
			themes.push( thisTheme );
		} else {
			themes = _.without( themes, thisTheme );
		}
		template.selectedThemes.set( _.unique( themes ) );
	},
	'submit form': function( evt ) {
		evt.preventDefault();

		var story = scrapeStoryData( $( evt.currentTarget ) );

		// honeypot to fool spam bots
		if( $('#check').val() !== '' ) {
			return;
		} else {
			Meteor.call('modifyStory', {_id: this._id}, story, function( errors ) {
				if( errors ) {
					Session.set( 'errors', errors.reason );
				} else {
					Session.set( 'errors', null );
					Router.go('edited');
				}
			});
		}
	}
});

Template.manageItem.helpers({
	themes: function() {
		return Themes.find();
	},
	keywords: function() {
		var search = Themes.findOne( this._id );
		return search ? search.keywords : [];
	},
	checked: function() {
		return this.published ? 'checked': '';
	},
	themeEnabled: function() {
		var selectedThemes = Template.instance().selectedThemes.get();
		return _.indexOf( selectedThemes, this._id ) > -1 ? 'checked' : '';
	},
	hasThemeKeyword: function( parentContext ) {
		var keyword = this && this.toString();
		var selectedThemes = Template.instance().selectedThemes.get();

		if( _.indexOf( selectedThemes, parentContext._id ) > -1 ) {
			return _.indexOf( Template.instance().data.keywords || [], keyword ) > -1 ? 'checked' : '';
		}
		return '';
	},
	// template hack to update selected themes when we hear back from the mongo db
	update: function( themes ) {
		Template.instance().selectedThemes.set( _.unique( themes ) );
	},
	selectedThemes: function() {
		return Template.instance().selectedThemes.get();
	},
	enableThemeForm: function( themeIDs, parentContext ) {
		return _.indexOf( themeIDs, parentContext._id ) === -1 ? 'disabled' : '';
	},
	parentId: function( par ) {
		return par._id;
	}
});