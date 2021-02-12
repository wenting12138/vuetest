import Vue from "vue";
import Vuex from "vuex";
import table from "./table.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
	  table
  }
});
