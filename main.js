function getSixSidedDice() {
  return [
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 99, 2, 3, 4, 5, 99],
    [ 99, 99, 3, 4, 5, 99]
  ]
}

function getMixedDice() {
  return [
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99, 99, 99],
    [ 1, 2, 3, 4, 5, 99, 99, 99, 99, 99]
  ]
}

function getAllCombos(numOfDice, dice) {
  return buildCombos(0, numOfDice, dice)
}

function buildCombos(dieIndex, numOfDice, dice) {
  var combos = []

  var die = dice[dieIndex];
  for (var i = 0; i < die.length; i++) {
    var thisCombo = [die[i]]

    if (dieIndex < numOfDice - 1) {
      var extras = buildCombos(dieIndex+1, numOfDice, dice)
      for (var k = 0; k < extras.length; k++) {
        combos.push(thisCombo.concat(extras[k]))
      }
    } else {
      combos.push(thisCombo)
    }
  }
  return combos;
}

function nonBeerArray(combo) {
  var result = []
  for (var k = 0; k < combo.length; k++) {
    if (combo[k] != 99) result.push(combo[k])
  }
  return result
}

function containsPattern(combo, patternArray) {
  var found = 0
  if (combo.length >= patternArray.length) {
    for (var k = 0; k < patternArray.length; k++) {
      var elem = patternArray[k]
      var pos = combo.indexOf(elem)
      if (pos != -1) {
        combo.splice(pos, 1)
        found++
      } else if (elem == "*" && combo.length > 0) {
        combo.pop()
        found++
      }
    }
  }
  return found == patternArray.length
}

function numericArrayPattern(pattern) {
  return pattern.split(" ").map(function(num) {
    if (num == "*") {
      return num
    } else {
      return parseInt(num, 10)
    }
  });
}

function getProbabilityWithDice(numOfDice, pattern, dice) {
  var combos = getAllCombos(numOfDice, dice)
  var denominator = combos.length
  var numerator = 0
  var patternArray = numericArrayPattern(pattern)
  for (var i = 0; i < denominator; i++) {
    if (containsPattern(nonBeerArray(combos[i]), patternArray)) {
      numerator++
    }
  }
  return numerator / denominator
}

function getProbabilityWithMixedDice(numOfDice, pattern) {
  return getProbabilityWithDice(numOfDice, pattern, getMixedDice())
}

function getProbability(numOfDice, pattern) {
  return getProbabilityWithDice(numOfDice, pattern, getSixSidedDice())
}
