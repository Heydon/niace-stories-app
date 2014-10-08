Template.manageResources.helpers({
	resources: function() {
		return Resources.find();
	}
});

Template.manageResource.helpers({
	themes: function() {
		return Themes.find();
	},
	checkedKeywords: function() {
		var keywords = Template.instance().data && Template.instance().data.keywords;
		return keywords && _.indexOf( keywords, this.toString() ) > -1 ? 'checked' : '';
	}
});

function constructResourceObjectFromForm( $form ) {
	var res = {};

	_.each(['title', 'content'], function(v) {
		res[v] = $form.find('[name="' + v + '"]').val();
	});

	res.keywords = _.map( $form.find('[name="keywords"]:checked'), function( kw ) {
		return kw.value;
	});

	return res;
}

Template.manageResource.events({
	'submit form': function( evt, template ) {
		var $form = $( evt.currentTarget );

		evt.preventDefault();
		if( template.data && template.data._id ) {
			Resources.update( template.data._id, {
				$set: constructResourceObjectFromForm( $form )
			});
		} else {
			Resources.insert( constructResourceObjectFromForm( $form ) );
		}

		Session.set('message', 'Resources saved!');
		Router.go('/resources');
	}
});