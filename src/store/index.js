import { createStore } from "vuex";
import station from "./station";
import auth from "./auth";
import login from "./login";
import modules from "./modules";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { station, auth, login, modules }
});
