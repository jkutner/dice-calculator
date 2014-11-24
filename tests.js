QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "getAllCombos", function( assert ) {
  assert.equal(getAllCombos(3, getSixSidedDice()).length, 216);
  assert.equal(getAllCombos(4, getSixSidedDice()).length, 1296);
  assert.equal(getAllCombos(5, getSixSidedDice()).length, 7776);
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

QUnit.test( "containsPatternArray", function( assert ) {
  assert.ok(containsPatternArray([1, 2, 3], [1, 2, 3]));
  assert.ok(containsPatternArray([2, 1, 3], [1, 2, 3]));
  assert.ok(containsPatternArray([1, 2, 3], [1, 2, "*"]));
  assert.ok(containsPatternArray([1, 2, 3], [1, "*", "*"]));

  assert.equal(containsPatternArray([1, 2, 3], [1, 4, "*"]), false);
  assert.equal(containsPatternArray([1, 2, 3], [1, 4, 3]), false);
});

QUnit.test( "containsRun", function( assert ) {
  assert.ok(containsRun([1, 2, 3], 3));
  assert.ok(containsRun([2, 1, 3], 2));
  assert.ok(containsRun([2, 1, 3], 1));

  assert.equal(containsRun([1, 2, 3], 4), false);
  assert.equal(containsRun([1, 1, 1], 2), false);
});

QUnit.test( "getProbability", function( assert ) {
  var star3 = getProbability(3, "*")
  var star5 = getProbability(5, "*")

  assert.equal(star3, 0.9953703703703703);
  assert.equal(star5, 0.9992283950617284);

  var one3 = getProbability(3, "1")
  var one4 = getProbability(4, "1")
  var one5 = getProbability(5, "1")

  assert.equal(one3, one4);
  assert.equal(one4, one5);

  var oneTwoStar3 = getProbability(3, "1 2 *")
  var oneTwoStar5 = getProbability(5, "1 2 *")

  assert.ok(oneTwoStar3 < oneTwoStar5);
  assert.ok(oneTwoStar3 < star3);
  assert.ok(oneTwoStar5 < star5);

  var fourFive3 = getProbability(3, "4 5")
  var fourFive5 = getProbability(5, "4 5")

  assert.ok(fourFive3 < fourFive5);
  assert.ok(oneTwoStar5 < fourFive5);

  var oneTwoThree3 = getProbability(3, "1 2 3")

  assert.ok(oneTwoThree3 > 0)

  var runThree3 = getProbability(3, "run(3)")
  var runThree4 = getProbability(4, "run(3)")
  var runThree5 = getProbability(5, "run(3)")

  assert.ok(runThree3 > 0)
  assert.ok(runThree3 < runThree4)
  assert.ok(runThree4 < runThree5)
  assert.ok(runThree5 < 1)
});
