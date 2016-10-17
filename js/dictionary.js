(function(global, word_tree){

global.dictionary = {
    word_tree : word_tree
  , alphabet : [ "a", "b"
               , "c", "d"
               , "e", "f"
               , "g", "h"
               , "i", "j"
               , "k", "l"
               , "m", "n"
               , "o", "p"
               , "q", "r"
               , "s", "t"
               , "u", "v"
               , "w", "x"
               , "y", "z"]
  , is_word : function(word) {
    return word_tree.get_node(word);
  }
};

})(this, this.word_tree)