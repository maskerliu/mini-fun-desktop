import Vuex from "vuex";
import modules from "./modules";

export default new Vuex.Store({
  modules,
  plugins: [
  ],
  strict: false, // process.env.NODE_ENV !== 'production'
});
