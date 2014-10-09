//tests/posts.js
var assert = require('assert');

suite('Stories', function() {
  test('in the server', function(done, server) {
    server.eval(function() {
      Stories.insert({title: 'hello title'});
      var docs = Stories.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 1);
      done();
    });
  });
});