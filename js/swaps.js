(function(global, dictionary) {

var swaps = {};

/////////////////////////////////////////////////////////////////////
/// Dictionary look up.
/////////////////////////////////////////////////////////////////////
swaps.dictionary = dictionary;

/////////////////////////////////////////////////////////////////////
/// This section pertains to starting a game of SWAPS.
/////////////////////////////////////////////////////////////////////
swaps.start = function(first_word) {
  return first_word.length === 3 &&
         swaps.dictionary.is_word(first_word);
}

/////////////////////////////////////////////////////////////////////
/// Following section pertains to checking if a given move is
/// valid.
/////////////////////////////////////////////////////////////////////



// Place the swaps object into the global scope.
global.swaps = swaps;

})(this, this.dictionary)