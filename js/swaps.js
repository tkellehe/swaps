(function(global, dictionary) {

var swaps = {
    past : undefined
  , dictionary : dictionary
  , constants : {
      START_CODES : {
        TEXT : [
            "Successfully started a game."
          , "Failed to start with a word of size three."
          , "Failed to provide a word."]
        , SUCCESS : 0
        , WORD_LENGTH : 1
        , NOT_WORD : 2
      }
    , MOVE_CODES : {
        TEXT : [
            "Successfully made a move."
          , "Provided the same word as before."
          , "Failed to produce a word within atleast a difference of one from the previous word."
          , "The word provided is too long."
          , "The word provided is too short."
          , "The move used a previous word."
          , "Failed to provide a word."
          , "The move attempted is not a vaid SWAPS move."]
        , SUCCESS : 0
        , SAME_WORD : 1
        , WORD_LENGTH_DIFFERENCE : 2
        , WORD_TOO_LONG : 3
        , WORD_TOO_SHORT : 4
        , PAST_WORD : 5
        , NOT_WORD : 6
        , INVALID_MOVE : 7
      }
  }

};

/////////////////////////////////////////////////////////////////////
/// This section pertains to starting a game of SWAPS.
/////////////////////////////////////////////////////////////////////
swaps.start = function(first_word) {
  if(first_word.length !== 3)
  {
    return swaps.constants.START_CODES.WORD_LENGTH;
  }

  var word_node = swaps.dictionary.is_word(first_word);
  
  if(!word_node.valid)
  {
    return swaps.constants.START_CODES.NOT_WORD;
  }

  swaps.past = [];
  swaps.past.unshift(word_node);

  return swaps.constants.START_CODES.SUCCESS;
}

/////////////////////////////////////////////////////////////////////
/// Following section pertains to checking if a given move is
/// valid. MOVES: REPLACE, SWAP, FLIP, REMOVE, ADD
/////////////////////////////////////////////////////////////////////

swaps.is_flip = function(last_word, next_word) {
  for(var l = last_word.length, i = l; i--;) {
    if(last_word[i] !== next_word[l - i - 1]) {
      return false;
    }
  }

  return true;
}

swaps.is_replace = function(last_word, next_word) {
  var diff = undefined;

  for(var i = last_word.length; i--;) {
    if(last_word[i] !== next_word[i]) {
      if(diff) {
        return false;
      } else {
        diff = last_word[i];
      }
    }
  }

  return true;
}

swaps.is_swap = function(last_word, next_word) {
  var diff = undefined, found_swap = false;

  for(var i = last_word.length; i--;) {
    if(last_word[i] !== next_word[i]) {
      if(found_swap) return false;
      if(diff) {
        if(diff === next_word[i]) {
          found_swap = true;
        } else {
          return false;
        }
      } else {
        diff = last_word[i];
      }
    }
  }

  return true;
}

swaps.is_add = function(last_word, next_word) {
  var offset = 0;

  for(var l = next_word.length, i = 0; i < l; ++i) {
    if(last_word[i - offset] !== next_word[i]) {
      if(offset) {
        return false;
      } else {
        offset = 1;
      }
    }
  }

  return true;
}

swaps.is_remove = function(last_word, next_word) {
  var offset = 0;

  for(var l = last_word.length, i = 0; i < l; ++i) {
    if(last_word[i] !== next_word[i - offset]) {
      if(offset) {
        return false;
      } else {
        offset = 1;
      }
    }
  }

  return true;
}

swaps.is_not_past = function(past, next_word) {
  for(var i = past.length; i--;) {
    if(past[i].word === next_word) {
      return false;
    }
  }

  return true;
}

swaps.move = function(next_word) {
  var last_word = swaps.past[0];

  if(last_word.word === next_word)
  {
    return swaps.constants.MOVE_CODES.SAME_WORD;
  }

  var length_check = next_word.length - last_word.word.length;
  if(length_check !== 0 && length_check !== -1 && length_check !== 1)
  {
    return swaps.constants.MOVE_CODES.WORD_LENGTH_DIFFERENCE;
  }

  if(10 < next_word.length)
  {
    return swaps.constants.MOVE_CODES.WORD_TOO_LONG;
  }

  if(next_word.length < 3)
  {
    return swaps.constants.MOVE_CODES.WORD_TOO_SHORT;
  }

  if(!swaps.is_not_past(swaps.past, next_word))
  {
    return swaps.constants.MOVE_CODES.PAST_WORD;
  }

  next_word = swaps.dictionary.is_word(next_word);

  if(!next_word.valid)
  {
    return swaps.constants.MOVE_CODES.NOT_WORD;
  } 

  var valid_move = false;

  if(length_check === 0)
  {
    if(swaps.is_flip(last_word.word, next_word.word) || 
       swaps.is_replace(last_word.word, next_word.word) ||
       swaps.is_swap(last_word.word, next_word.word))
      valid_move = true;
  }

  if(length_check === 1 && swaps.is_add(last_word.word, next_word.word))
  {
    valid_move = true;
  }

  if(length_check === -1 && swaps.is_remove(last_word.word, next_word.word))
  {
    valid_move = true;
  }

  if(valid_move)
  {
    swaps.past.unshift(next_word);
    return swaps.constants.MOVE_CODES.SUCCESS;
  }

  return swaps.constants.MOVE_CODES.INVALID_MOVE;
}

// Place the swaps object into the global scope.
global.swaps = swaps;

})(this, this.dictionary)
