function getDie(i) {
  var dice = [
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 1, 2, 3, 4, 5, 99],
    [ 99, 2, 3, 4, 5, 99],
    [ 99, 99, 3, 4, 5, 99]
  ]

  return dice[i-1]
}

function getAllCombos(numOfDice) {
  return buildCombos(0, numOfDice)
}

function buildCombos(dieIndex, numOfDice) {
  var combos = []

  var die = getDie(1);
  for (var i = 0; i < die.length; i++) {
    var thisCombo = [die[i]]

    if (dieIndex < numOfDice) {
      var extras = buildCombos(dieIndex+1, numOfDice)
      for (var k = 0; k < extras.length; k++) {
        combos.push(thisCombo.concat(extras[k]))
      }
    } else {
      combos.push([thisCombo])
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
        combo.splice(pos, 1)
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

function getProbability(numOfDice, pattern) {
  var combos = getAllCombos(numOfDice)
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
