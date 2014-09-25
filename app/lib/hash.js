if( Meteor.isClient && typeof window.Hash === 'undefined' ) {
	(function( window ) {

		var hash = new ReactiveDict();

		// shallow deparam
		function deparamHashFragment( frag ) {
			var result = {};
			var coercedValues = {
				'true': true,
				'false': false,
				'null': null
			};
			if( typeof frag === 'string' ) {
				if( frag.indexOf('#') === 0 ) {
					frag = frag.slice(1);
				}

				_.each( frag.split('&'), function( keyAndValue ) {
					var spl = keyAndValue.split('=');
					var key = spl[0];
					var val = spl[1];

					result[ key ] = coercedValues.hasOwnProperty( val ) ? coercedValues[ val ] : val;
				});
			}
			return result;
		}

		function set( val, key ) {
			console.log('setting hash: ' + key);
			hash.set( key, val );
		}

		function setHashFragment() {
			// do some fragment re-working
			var depd = deparamHashFragment( window.location.hash );
			console.log( depd );
			_.each( depd, set );
		}

		Meteor.startup( setHashFragment );

		$(window).on('hashchange', setHashFragment );

		window.Hash = hash;

	})( window );
}