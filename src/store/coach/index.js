import { api } from "../../api";
//import router from "../../router";
import * as types from "./constant";

const state = {
  loading: false,
  coachData: null,
  error: null
};

const mutations = {
  [types.M_COACH_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_COACH_SUCCESS](state, payload) {
    state.loading = false;
    state.coachData = payload;
    state.error = null;
  },
  [types.M_COACH_FAILURE](state, payload) {
    state.loading = false;
    state.coachData = null;
    state.error = payload;
  }
};

const actions = {
  [types.A_FETCH_LIST_COACH]({ commit }) {
    commit(types.M_COACH_REQUEST);
    api
      .get("/coachs")
      .then(response => {
        commit(types.M_COACH_SUCCESS, response.data);
      })
      .catch(error => {
        commit(types.M_COACH_FAILURE, error);
      });
  }
};

export default { state, mutations, actions };
