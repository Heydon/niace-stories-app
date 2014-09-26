function getCurrentPage() {
	return parseInt( Router.current().params.page, 10 ) || 0;
}

Template.storyPagination.helpers({
	showNext: function() {
		return Stories.find().count() === 10;
	},
	showPrev: function() {
		return getCurrentPage() > 0;
	},
	page: function() {
		return getCurrentPage();
	},
	next: function() {
		return getCurrentPage() + 1;
	},
	prev: function() {
		return getCurrentPage() - 1;
	},
	humanize: function( page ) {
		return parseInt( page, 10 ) + 1;
	}
});