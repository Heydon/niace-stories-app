Template.storyPagination.created = function() {
	//Hash.set('page', Hash.get('page') || 0);
};

Template.storyPagination.helpers({
	page: function() {
		console.log( this , arguments );
		// return Hash.get('page');
	},
	next: function() {
		console.log( this , arguments );
		// return parseInt( Hash.get('page'), 10 ) + 1;
	},
	prev: function() {
		console.log( this , arguments );
		// return parseInt( Hash.get('page'), 10 ) - 1;
	}
});

// Template.storyPagination.events({
// 	'click [role="pagination"] button': function() {
// 		Session.set('page', Session.get('page') + 1);
// 	}
// });

// // Template.storyPagination.destroyed = function () {
// // 	Session.set('page', 0);
// // };