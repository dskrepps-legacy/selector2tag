var selector2tag = require('../');
var fixtures = require('./fixtures.js');
var assert = require('assert');
require('mocha');

describe('selector2tag(simpleSelector)', function() {
  it('.openingTag should be correct', function(done) {
    var actual = selector2tag(fixtures.simpleSelector).openingTag;
    var expected = fixtures.simpleOpeningTag;

    assert.equal(actual, expected);
    done();
  });

  it('.closingTag should be correct', function(done) {
    var actual = selector2tag(fixtures.simpleSelector).closingTag;
    var expected = fixtures.simpleClosingTag;

    assert.equal(actual, expected);
    done();
  });

});

describe('selector2tag(complexSelector)', function() {
  it('.openingTag should be correct', function(done) {
    var actual = selector2tag(fixtures.complexSelector).openingTag;
    var expected = fixtures.complexOpeningTag;

    assert.equal(actual, expected);
    done();
  });

});