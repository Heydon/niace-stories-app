#!/usr/bin/env node

/**
 * This file will print the contents of the database configured in the environment
 * variable MONGOHQ_URL. Hard coded to collect a set list of data.
 */
var MongoClient = require('mongodb').MongoClient;
var args = process.argv.slice(2);
//  check for -d, and use it to tell us we want a debug version of the file.
var debug = args.indexOf('-d') > -1;
var template = [];
var meta = [
	{
		name: 'stories',
		search: {
			published: true
		}
	},
	{
		name: 'alerts'
	},
	{
		name: 'config'
	},
	{
		name: 'themes'
	},
	// {
	// 	name: 'glossary'
	// }
];

// take the template array and add additional javascript to
// make sure we run this at the right time.
function finish() {
	var cordovaCheck = debug ? '&&1' : '&&Meteor.isCordova';
	template.unshift(
	'if(Meteor.isClient' + cordovaCheck +  ') {',
		'Meteor.startup(function() {');
	template.push(
		'});',
	'}');
	return template.join( debug ? '\n' : '');
}

// take the object and string representation of the datatype 
// and construct a useable statement 
// a la "Stories.insert( {...} );"
function constructInsertStatement( data, dataType ) {
	var tab = '';
	if( debug ) {
		tab = '\t';
	}
	return tab + dataType + '.insert(' + JSON.stringify( data ) + ');';
}

if( process.env.MONGOHQ_URL ) {
	MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
		if( err ) throw err;

		meta.forEach(function( conf, i ) {
			var dataType = conf.name.replace(/^[a-z]/, function( ch ) {
				return ch.toUpperCase();
			});
			db
				.collection( conf.name )
				.find( conf.search || {} )
				.toArray(function( err, docs ) {
					if( debug ) {
						template.push('/**');
						template.push(' * constructing client import for ' + dataType);
						template.push(' */')
					}
					docs.forEach(function( documentData ) {
						template.push('if(!' + dataType + '.findOne("' + documentData._id + '")){');
						template.push( constructInsertStatement( documentData, dataType ) );
						template.push('}');
					});
					if( i + 1 === meta.length ) {
						console.log( finish() );
						process.exit();
					}
				});
		});
	});
}