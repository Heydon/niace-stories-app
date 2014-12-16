Template.manageGlossary.helpers({
	terms: function() {
		return Glossary.find({}, {sort: { term: 1 }});
	}
});

Template.glossary.helpers({
	terms: function() {
		return Glossary.find({}, {sort: { term: 1 }});
	}
});

function constructTermObject( $form ) {
	var res = {};

	_.each(['term', 'definition'], function(v) {
		res[v] = $form.find('[name="' + v + '"]').val();
	});

	return res;
}

Template.manageGlossaryTerm.events({
	'submit form': function( evt, template ) {
		var $form = $( evt.currentTarget );

		evt.preventDefault();
		if( template.data && template.data._id ) {
			Glossary.update( template.data._id, {
				$set: constructTermObject( $form )
			});
		} else {
			Glossary.insert( constructTermObject( $form ) );
		}

		Session.set('message', 'Glossary saved!');
		Router.go('/manageglossary');
	}
});

Template.deleteGlossaryTerm.events({
	'click .delete': function() {
		Glossary.remove( this._id );
		Session.set('message', 'Term deleted.');
		Router.go('/manageglossary');
	},
	'click .cancel': function() {
		Router.go('/manageglossary');
	}
});