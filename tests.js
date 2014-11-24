QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "getDie", function( assert ) {
  assert.equal(getDie(3).length, 6);
  assert.equal(getDie(4).length, 6);
  assert.equal(getDie(5).length, 6);
});

QUnit.test( "getAllCombos", function( assert ) {
  assert.equal(getAllCombos(3).length, 1296);
  assert.equal(getAllCombos(4).length, 7776);
  assert.equal(getAllCombos(5).length, 46656);
});

QUnit.test( "nonBeerArray", function( assert ) {
  assert.deepEqual(nonBeerArray([1, 2, 99]), [1, 2]);
  assert.deepEqual(nonBeerArray([1, 99, 2]), [1, 2]);
  assert.deepEqual(nonBeerArray([99, 99, 99]), []);
});

QUnit.test( "numericArrayPattern", function( assert ) {
  assert.deepEqual(numericArrayPattern("1 2 *"), [1, 2, "*"]);
  assert.deepEqual(numericArrayPattern("1 2 * 3"), [1, 2, "*", 3]);
});

QUnit.test( "containsPattern", function( assert ) {
  assert.ok(containsPattern([1, 2, 3], [1, 2, 3]));
  assert.ok(containsPattern([1, 2, 3], [1, 2, "*"]));
  assert.ok(containsPattern([1, 2, 3], [1, "*", "*"]));

  assert.equal(containsPattern([1, 2, 3], [1, 4, "*"]), false);
  assert.equal(containsPattern([1, 2, 3], [1, 4, 3]), false);
});

QUnit.test( "getProbability", function( assert ) {
  var star3 = getProbability(3, "*")
  var star5 = getProbability(5, "*")

  assert.equal(star3, 0.9992283950617284);
  assert.equal(star5, 0.9999785665294925);

  var oneTwoStar3 = getProbability(3, "1 2 *")
  var oneTwoStar5 = getProbability(5, "1 2 *")

  assert.ok(oneTwoStar3 < oneTwoStar5);
  assert.ok(oneTwoStar3 < star3);
  assert.ok(oneTwoStar5 < star5);

  var fourFive3 = getProbability(3, "4 5")
  var fourFive5 = getProbability(5, "4 5")

  assert.ok(fourFive3 < fourFive5);
  assert.ok(oneTwoStar5 < fourFive5);
});
