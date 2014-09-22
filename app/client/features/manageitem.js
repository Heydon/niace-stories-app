Template.manageitem.created = function() {
	this.selectedTheme = new ReactiveVar();
	this.selectedTheme.set( this.data.story.theme );
};

Template.manageitem.events({
	'change #theme': function( evt, template ) {
		var $form = $( evt.currentTarget );

		template.selectedTheme.set( $form.val() );
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
			Meteor.call('modifyStory', {_id: this.story._id}, story, function( error ) {
				if( error ) {
					return alert( error.reason );
				}
				Router.go('edited');
			});
		}
	}
});

Template.manageitem.helpers({
	themes: function() {
		return themes.find();
	},
	keywords: function( themeId ) {
		var search = themes.findOne( themeId );
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