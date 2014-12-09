/**
 * File for small collections of events
 * Move large helpers and stuff into client/features/feature.js
 */

var showSubmenu = function(dropdown) {
	console.log('show');
	dropdown.attr('aria-hidden', 'false');
};

var hideSubmenu = function(dropdown) {
  dropdown.attr('aria-hidden', 'true');
};

Template.banner.events({
	'mouseenter [aria-haspopup]': function(e) {
		showSubmenu($(e.currentTarget).next());
	},
	'focus .info > a': function() {
		hideSubmenu($('[aria-label="submenu"]'));
	},
	'click [aria-haspopup]': function(e) {
		e.preventDefault();
		var submenu = $(e.currentTarget).next();
		showSubmenu(submenu);
		$(submenu).find('li:first-child a').focus();	
	},
	'mouseleave .info': function(e) {
		hideSubmenu($(e.currentTarget).find('[aria-label="submenu"]'));
	},
	'blur [aria-label="submenu"] li:last-child a': function() {
		hideSubmenu($('[aria-label="submenu"]'));
	}
});