Template.manageItem.created = function() {
	this.selectedThemes = new ReactiveVar();
	this.selectedThemes.set( this.data.story.themes );
};

Template.manageItem.events({
	'change [name="themes"] .enable-theme': function( evt, template ) {
		var $checkbox = $( evt.currentTarget );
		var themes = template.selectedThemes.get();
		var thisTheme = $checkbox.val();

		if( $checkbox.is(':checked') ) {
			themes.push( thisTheme );
		} else {
			_.without( themes, thisTheme );
		}
		template.selectedThemes.set( _.unique( themes ) );
	},
	'submit form': function( evt ) {
		function getInputVal( el ) {
			var $el = $(el);
			return $el.is(':checked') && $el.attr('value');
		}
		var story = {
			name: $('#name').val(),
			story: $('#story').val(),
			theme: $('#theme').val(),
			published: $('#published').is(':checked'),
			keywords: _.chain( $('.keywords input') ).map( getInputVal ).filter( Boolean ).value()
		};
		evt.preventDefault();

		// honeypot to fool spam bots
		if( $('#check').val() !== '' ) {
			return;
		} else {
			Meteor.call('modifyStory', {_id: this.story._id}, story, function( errors ) {
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
	keywords: function( themeId ) {
		var search = Themes.findOne( themeId );
		return search ? search.keywords : [];
	},
	currentTheme: function() {
		return this.story.theme;
	},
	checked: function() {
		return this.story.published ? 'checked': '';
	},
	selected: function( parentContext ) {
		return this._id === parentContext.story.theme ? 'selected' : '';
	},
	hasThemeKeyword: function( parentContext, selectedTheme ) {
		var keyword = this && this.toString();
		if( parentContext.story.theme === selectedTheme ) {
			return _.indexOf(parentContext.story.keywords || [], keyword) > -1 ? 'checked' : '';
		}
		return '';
	},
	selectedTheme: function() {
		return Template.instance().selectedTheme.get();
	}
});