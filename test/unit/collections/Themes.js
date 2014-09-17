(function() {

	'use strict';

	describe('Theme collection', function() {

		it(' has only one instantiation', function() {
			expect(Meteor.instantiationCounts.themes).toBe(1);
		});

	});

})();