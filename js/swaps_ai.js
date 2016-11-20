(function(global, swaps){
var swaps_ai = {
  splice: function(s,start,delCount,newSubStr) {
    return s.slice(0, start) + newSubStr + s.slice(start + delCount);
  }
};

swaps_ai.move0 = function() {
  var last_word = swaps.last_word().word,
    length = last_word.length,
    ptr = {content:undefined},
    code, next_word;

  // Test if reversing the word is a valid move.
  next_word = '';
  for(var i = length; i; next_word += last_word[--i]);
  if(!swaps.validate(next_word, ptr)) {
    return ptr.content;
  }

  // Test if swapping any two letters is a valid move.
  for(var i = 0; i < length; ++i) {
    for(var j = i+1; j < length; ++j) {
      next_word = swaps_ai.splice(last_word, i, 1, last_word[j]);
      next_word = swaps_ai.splice(next_word, j, 1, last_word[i]);
      if(!swaps.validate(next_word, ptr)) {
        return ptr.content;
      }
    }
  }

  // Test if adding a letter is a valid move.
  for(var i = 0; i < swaps.dictionary.alphabet.length; ++i) {
    for(var j = 0; j <= length; ++j) {
      next_word = swaps_ai.splice(last_word, j, 0, swaps.dictionary.alphabet[i]);
      if(!swaps.validate(next_word, ptr)) {
        return ptr.content;
      }
    }
  }

  // Test if replacing a letter is a valid move.
  for(var i = swaps.dictionary.alphabet.length; i--;) {
    for(var j = length; j--;) {
      next_word = swaps_ai.splice(last_word, j, 1, swaps.dictionary.alphabet[i]);
      if(!swaps.validate(next_word, ptr)) {
        return ptr.content;
      }
    }
  }

  // Test if removing a letter is a valid move.
  for(var j = length; j--;) {
    next_word = swaps_ai.splice(last_word, j, 1, '');
    if(!swaps.validate(next_word, ptr)) {
      return ptr.content;
    }
  }

  return undefined;
}

global.swaps_ai = swaps_ai;

})(this, this.swaps)