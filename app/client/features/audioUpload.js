// current support ie10+, this is due to the use of FileReader
// shims are possible using iframes(ick) or silverlight(double ick)
Template.audioUpload.events({
	'click button': function( evt, template ) {
		evt.preventDefault();
	}
});

// fileupload shim
Template.audioUpload.rendered = function () {
	var template = this;
	template.$('[type="file"]').fileupload({
		url: '/audio',
		autoUpload: false,
		replaceFileInput: false,
		add: function( evt, data ) {
			template.data = data;
			data.submit();
		},
		done: function() {
			debugger;
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