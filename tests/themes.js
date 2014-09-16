'use strict';

var assert = require('assert');

suite('Themes', function() {
  test('in the server', function(done, server) {
    server.eval(function() {
      Themes.insert({title: 'hello title'});
      var docs = Themes.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 1);
      done();
    });
  });
});