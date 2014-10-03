#!/usr/bin/env node

/**
 * Crazy fixture generating script
 */

var http = require('http');

var args = process.argv.slice(2);

args.forEach(function( a ) {
	a = a.toLowerCase();
	if( a === '--help' || a === '-h' ) {
		console.log(
			'\nUsage: ./fillout.js [number of stories ( optional )]\n\n' +
			'\tExample usage:\n' + 
			'\t./fillout.js 100\n\n' +
			'\tBest to probably pipe the contents of this execution to the stories.json file\n' + 
			'\t( > app/private/stories/stories.json )\n' +
			'\tIt is also possible to pipe the contents of the themes to this script to populate\n' +
			'\tthe stories with themes and keywords for example:\n' +
			'\tmongo 127.0.0.1:3001/meteor --quiet --eval "printjson(db.themes.find().toArray())" | ./fillout.js 150'
		);
		process.exit(1);
	}
});

var thisMany = parseInt( args[0], 10 ) || 25;

var urlToFetchStories = 'http://jaspervdj.be/lorem-markdownum/markdown.txt?';
var urlQueryOptions = {
	'no-headers': ['on'],
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

function randomArray( arrayOfOptions, len ) {
	var res = [];
	var i = 0;
	var added = [];
	var pos;
	len = len || arrayOfOptions.length;
	for( ; i < len; i++ ) {
		pos = rand( 0, arrayOfOptions.length - 1 );
		if( added.indexOf( pos ) === -1 ) {
			res.push( arrayOfOptions[ pos ] );
			added.push( pos );
		}
	}
	return res;
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

function fetchThese( count, url, opts, cb ) {
	var i = 0;
	var datas = [];
	return function next() {
		if( i++ < count ) {
			var joinedURL = url + stringify( randomObjectValue( opts ) );
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
}

function pluck( arr, val ) {
	return arr.map(function( v ) { return v[val]; });
}

var ArrayPrototype = Array.prototype;
var concat = ArrayPrototype.concat;
function _f( arr, output ) {
	arr.forEach(function( val ) {
		if( val instanceof Array ) {
			_f( val, output );
		} else {
			output.push( val );
		}
	});
	return output;
}
function flatten( arr ) {
	var arrs = concat.call( ArrayPrototype, arr );
	return _f( arrs, [] );
}

function getThemesAndKeywords( themes ) {
	var subset = randomArray( themes, themes.length / 2 | 0);

	if( subset.length === 0 ) {
		subset.push( themes[ rand( 0, themes.length - 1 ) ] );
	}

	return {
		themes: pluck(subset, '_id'),
		keywords: flatten( pluck(subset, 'keywords') )
	};
}

var sevenDays = 1000 * 60 * 60 * 24 * 7;

function compileStoriesWithThemes( themes ) {
	themes = themes || [];
	return function compileStories( storyArray ) {
		console.log( JSON.stringify( storyArray.map(function( story ) {
			var themeIdsAndKeywords = getThemesAndKeywords( themes );
			return extend({
				story: story,
				submitted: Date.now() + rand( -sevenDays, 0 ),
				keywords: randomArray( themeIdsAndKeywords.keywords, rand( 0, themeIdsAndKeywords.keywords.length )),
				themes: themeIdsAndKeywords.themes
			}, randomObjectValue( baseStory ) );
		})) );
	};
}

// if we aren't reading any themes in
if( process.stdin.isTTY ) {
	// set up our callbacks and start
	var start = fetchThese( thisMany, urlToFetchStories, urlQueryOptions, compileStoriesWithThemes() );
	start();
} else {
	var themesString = '';
	process.stdin.on('data', function( data ) {
		themesString += data.toString();
	});
	process.stdin.on('end', function() {
		// create our compile stories function
		var compileStories = compileStoriesWithThemes( JSON.parse(themesString) );
		var start = fetchThese( thisMany, urlToFetchStories, urlQueryOptions, compileStories );

		start();
	});
}