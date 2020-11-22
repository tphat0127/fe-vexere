import * as types from "./constant";
import { api } from "./../../api";
const state = {
  loading: false,
  data: null,
  error: null,
};

const mutations = {
  [types.M_STATION_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_STATION_SUCCESS](state, payload) {
    state.loading = false;
    state.data = payload;
    state.error = null;
  },
  [types.M_STATION_FAILED](state, payload) {
    state.loading = false;
    state.data = null;
    state.error = payload;
  },
};

const actions = {
  [types.A_FETCH_LIST_STATION]({ commit }) {
    commit(types.M_STATION_REQUEST);
    api
      .get("/stations")
      .then((response) => {
        commit(types.M_STATION_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_STATION_FAILED, error);
      });

    console.log(state.loading);
  },
  fetchDetailStation({ commit }, id) {
    commit(types.M_STATION_REQUEST);
    api
      .get(`/stations/${id}`)
      .then((response) => {
        commit(types.M_STATION_SUCCESS, response.data);
        console.log(response.data);
      })
      .catch((error) => {
        commit(types.M_STATION_FAILED, error);
      });
  },
};

export default { state, mutations, actions };
