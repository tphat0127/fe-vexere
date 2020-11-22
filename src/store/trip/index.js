import { api } from "../../api";
import * as types from "./constant";
const state = {
  loading: false,
  data: null,
  error: null
};

const mutations = {
  [types.M_TRIP_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_TRIP_SUCCESS](state, payload) {
    state.loading = false;
    state.data = payload;
    state.error = null;
  },
  [types.M_TRIP_FAILED](state, payload) {
    state.loading = false;
    state.data = null;
    state.error = payload;
  }
};

const actions = {
  [types.A_FETCH_LIST_TRIP]({ commit }) {
    commit(types.M_TRIP_REQUEST);
    api
      .get("/trips")
      .then(response => {
        commit(types.M_TRIP_SUCCESS, response.data);
        //console.log(state.loading);
      })
      .catch(error => {
        commit(types.M_TRIP_FAILED, error);
      });
  }
};

export default { state, mutations, actions };
