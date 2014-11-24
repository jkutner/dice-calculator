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
  var tokens = pattern.split(" ")

  if (tokens[0].match("run")) {
    var runSize = parseInt(tokens[0].match(/\d/)[0], 10)
    var min = 0
    if (tokens.length > 1 && tokens[1].match("min")) {
      min = parseInt(tokens[1].match(/\d/)[0], 10)
    }
    return containsRun(combo, runSize, min)
  } else if (tokens[0].match("set")) {
    var setSize = parseInt(tokens[0].match(/\d/)[0], 10)
    var min = 0
    if (tokens.length > 1 && tokens[1].match("min")) {
      min = parseInt(tokens[1].match(/\d/)[0], 10)
    }
    return containsSet(combo, setSize, min)
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

function containsRun(combo, targetRunSize, min) {
  return containsCompare(combo, targetRunSize, function(a, b) {
    return b >= min && a == b + 1
  });
}

function containsSet(combo, targetSetSize, min) {
  return containsCompare(combo, targetSetSize, function(a, b) {
    return a >= min && a == b
  });
}

function containsCompare(combo, targetSize, comparison) {
  var longest = 1
  var current = 1
  var sortedCombo = combo.sort()
  for (var m = 1; m < sortedCombo.length; m++) {
    if (comparison(sortedCombo[m], sortedCombo[m-1])) {
      current++
    } else {
      longest = (longest > current) ? longest : current
      current = 1
    }
  }
  longest = (longest > current) ? longest : current

  return longest >= targetSize
}

function containsMin(combo, minValue) {
  for (var m = 0; m < combo.length; m++) {
    if (sortedCombo[m] >= minValue) {
      return true
    }
  }
  return false
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

  var p = numerator / denominator;

  // Three independent roles
  //return 1 - Math.pow((1 - p), 3)

  return p
}

function getProbabilityWithMixedDice(numOfDice, pattern) {
  return getProbabilityWithDice(numOfDice, pattern, getMixedDice())
}

function getProbability(numOfDice, pattern) {
  return getProbabilityWithDice(numOfDice, pattern, getSixSidedDice())
}
