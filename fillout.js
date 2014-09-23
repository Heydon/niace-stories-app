#!/usr/bin/env node

var http = require('http');

var args = process.argv.slice(2);

var url = 'http://jaspervdj.be/lorem-markdownum/markdown.txt?';

args.forEach(function( a ) {
	a = a.toLowerCase();
	if( a === '--help' || a === '-h' ) {
		console.log(
			'\nUsage: ./fillout.js [number of stories ( optional )] [theme ids...]\n\n' +
			'\tExample usage:\n' + 
			'\t./fillout.js 100 TPPQTibMF7ZNR849B MzcwEDpZZfMYdSmj2 wgjDY2vkyJyJLNyeM m4crZw4YaKXLqtBC3 XqN8fApvwyp7cCciq\n\n' +
			'\tBest to probably pipe the contents of this execution to the stories.json file\n' + 
			'\t( > app/private/stories/stories.json )'
		);
		process.exit(1);
	}
});

var thisMany = parseInt( args[0], 10 );
var themeIds;
if( !isNaN( thisMany ) ) {
	themeIds = args.slice(1);
} else {
	thisMany = 25;
	// copy array
	themeIds = args.slice();
}

var options = {
	'no-headers': ['', 'on'],
	'no-code': ['on'],
	'no-quotes': ['', 'on'],
	'no-lists': ['', 'on'],
	'no-inline-markup': ['', 'on'],
	'reference-links': ['', 'on'],
	'underline-headers': ['', 'on'],
	'underscore-em': ['', 'on'],
	'underscore-strong': ['', 'on'],
	'num-blocks': [1,2,3,4,5]
};

var baseStory = {
	name: ['Ali', 'Albi', 'Alex', 'George', 'Fan', 'Freddie', 'Frankie', 'Narin', 'Jordan', 'Sasha', 'Robin', 'Ronnie', 'Sam', 'Charlie', 'Reese', 'Taylor', 'Sid'],
	published: [true, true, false]
};
// skinny extend
function extend() {
	var base = arguments.length > 1 ? arguments[0] : {};
	var args = Array.prototype.slice.call( arguments, base === arguments[0] ? 1 : 0 );
	Array.prototype.forEach.call( args, function( obj ) {
		if( !obj || !obj.hasOwnProperty ) { return; }
		var k;
		for( k in obj ) {if( obj.hasOwnProperty( k ) ) {
			base[ k ] = typeof base[ k ] === 'object' ? extend( obj[k] ) : obj[k];
		}}
	});
	return base;
}

function rand( min, max ) {
	if( max === undefined ) {
		max = min;
		min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

function randomObjectValue( obj ) {
	var key;
	var result = {};
	var val;
	for( key in obj ) {if( obj.hasOwnProperty( key ) ) {
		val = obj[ key ];
		result[ key ] = val[ rand(0, val.length - 1 ) ];
	}}
	return result;
}

function stringify( obj ) {
	var key;
	var result = [];
	var val;
	for( key in obj ) {if( obj.hasOwnProperty( key ) ) {
		val = obj[ key ];
		result.push( key + '=' + val );
	}}
	return result.join('&');
}

var startFetching = (function( count ) {
	var i = 0;
	var datas = [];
	var cb;
	return function next( callback ) {
		cb = cb || callback;
		if( i++ < count ) {
			var joinedURL = url + stringify( randomObjectValue( options ) );
			http.get( joinedURL, function( res ) {
				var chunked = '';
				res.on('data', function( chunk ) {
					chunked += chunk.toString();
				});
				res.on('end', function() {
					// console.log( chunked );
					datas.push( chunked );
				});
				res.on('end', next);
			}).on( 'error', next );
		} else {
			cb( datas );
			i = 0;
			datas = [];
		}
	};
})( thisMany );

function compileStories( storyArray ) {
	console.log( JSON.stringify( storyArray.map(function( story ) {
		return extend({
			story: story.replace(/"/g, '\\"'),
			submitted: Date.now() + rand( -60000, 0 ),
			keywords: [''],
			theme: themeIds[ rand( 0, themeIds.length - 1 ) ]
		}, randomObjectValue( baseStory ) );
	})) );
}

startFetching( compileStories );