import { createStore } from "vuex";
import station from "./station";
import auth from "./auth";
import login from "./login";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { station, auth, login }
});
