function getCurrentPage() {
	return parseInt( Router.current().params.query.page, 10 ) || 0;
}

function arePages() {
	if( Config.findOne('pageSize') ) {
		return this.stories.count() === Config.findOne('pageSize').value;
	} else {
		return this.stories.count() === 10;
	}
}

Handlebars.registerHelper('page', getCurrentPage );

Handlebars.registerHelper('humanizePage', function( page ) {
	return ( typeof page === 'string' ? parseInt( page, 10 ) : getCurrentPage() ) + 1;
});

Template.storyPagination.helpers({
	showNext: arePages,
	showPrev: function() {
		return getCurrentPage() > 0;
	},
	next: function() {
		return getCurrentPage() + 1;
	},
	prev: function() {
		return getCurrentPage() - 1;
	},
	paged: function() {
		return !(getCurrentPage() === 0 && !arePages.call( this ));
	}
});