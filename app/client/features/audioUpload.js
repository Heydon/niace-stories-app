// current support ie10+, this is due to the use of FileReader
// shims are possible using iframes(ick) or silverlight(double ick)
Template.audioUpload.events({
	'click button': function( evt, template ) {
		var file = template.$('input');
		var reader = new FileReader();
	}
});

// fileupload shim
Template.audioUpload.rendered = function () {
	this.$('[type="file"]').fileUpload({
		add: function() {
			
		}
	});
};

// our blob file with the contents of the file chosen
// var file = $('[name="uploadSound"]').get(0).files[0];
// var reader = new FileReader();
// var xhr = new XMLHttpRequest();

// xhr.open('POST', '/audio');
// xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');

// xhr.onload = function() {
// 	console.log('finished upload!');
// 	debugger;
// };

// reader.onload = function( evt ) {
// 	if( this.readyState === 2 ) {
// 		console.log( 'sending binary data');
// 		xhr.send( this.result );
// 	}
// };

// reader.readAsBinaryString( file );