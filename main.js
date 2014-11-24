function getSixSidedDice() {
  return [
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 99, 2, 3, 4, 5, 99],
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

function containsPattern(combo, pattern) {
  if (pattern.match("run")) {
    var result = pattern.match(/\d/)
    return containsRun(combo, parseInt(result[0], 10))
  } else {
    return containsPatternArray(combo, numericArrayPattern(pattern))
  }
}

function containsPatternArray(combo, patternArray) {
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

function containsRun(combo, targetRunSize) {
  var longestRun = 1
  var currentRun = 1
  var sortedCombo = combo.sort()
  for (var m = 1; m < sortedCombo.length; m++) {
    if (sortedCombo[m] == (sortedCombo[m-1] + 1)) {
      currentRun++
    } else {
      longestRun = (longestRun > currentRun) ? longestRun : currentRun
      currentRun = 1
    }
  }
  longestRun = (longestRun > currentRun) ? longestRun : currentRun

  return longestRun >= targetRunSize
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
  for (var i = 0; i < denominator; i++) {
    if (containsPattern(nonBeerArray(combos[i]), pattern)) {
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
