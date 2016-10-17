(function(global, word_list){

var word_tree = {
    a : word_list.a_words.split("\n")
  , b : word_list.b_words.split("\n")
  , c : word_list.c_words.split("\n")
  , d : word_list.d_words.split("\n")
  , e : word_list.e_words.split("\n")
  , f : word_list.f_words.split("\n")
  , g : word_list.g_words.split("\n")
  , h : word_list.h_words.split("\n")
  , i : word_list.i_words.split("\n")
  , j : word_list.j_words.split("\n")
  , k : word_list.k_words.split("\n")
  , l : word_list.l_words.split("\n")
  , m : word_list.m_words.split("\n")
  , n : word_list.n_words.split("\n")
  , o : word_list.o_words.split("\n")
  , p : word_list.p_words.split("\n")
  , q : word_list.q_words.split("\n")
  , r : word_list.r_words.split("\n")
  , s : word_list.s_words.split("\n")
  , t : word_list.t_words.split("\n")
  , u : word_list.u_words.split("\n")
  , v : word_list.v_words.split("\n")
  , w : word_list.w_words.split("\n")
  , x : word_list.x_words.split("\n")
  , y : word_list.y_words.split("\n")
  , z : word_list.z_words.split("\n")
  , get_node : function(word) {
      var temp = word_tree[word[0]];
      var result = { word: word, valid: true };
      for(var i = temp.length; i--;) {
        if(word === temp[i]) {
          return result;
        }
      }
      result.valid = false;
      return result;
    }
};

global.word_tree = word_tree;

})(this, word_list)