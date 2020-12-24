import { createStore } from "vuex";
import station from "./station";
import auth from "./auth";
import login from "./login";
import modules from "./modules";
import trip from "./trip";
import coach from "./coach";
import ticket from "./ticket";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { station, auth, login, modules, trip, coach, ticket }
});
