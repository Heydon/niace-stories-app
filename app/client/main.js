Meteor.startup(function() {
	Meteor.subscribe('themes');
	Meteor.subscribe('glossary');
	Meteor.subscribe('config');
});

var Recordings = new FS.Collection("recordings", {
  stores: [new FS.Store.FileSystem("recordings", {path: "~/recordings"})]
});