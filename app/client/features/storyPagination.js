function getCurrentPage() {
	return parseInt( Router.current().params.page, 10 ) || 0;
}

Handlebars.registerHelper('page', getCurrentPage );

Handlebars.registerHelper('humanizePage', function( page ) {
	return ( typeof page === 'string' ? parseInt( page, 10 ) : getCurrentPage() ) + 1;
});

Template.storyPagination.helpers({
	showNext: function() {
		return Stories.find().count() === 10;
	},
	showPrev: function() {
		return getCurrentPage() > 0;
	},
	next: function() {
		return getCurrentPage() + 1;
	},
	prev: function() {
		return getCurrentPage() - 1;
	}
});