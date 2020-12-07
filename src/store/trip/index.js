import { api } from "../../api";
import * as types from "./constant";
import router from "../../router";
const state = {
  loading: false,
  data: null,
  error: null,
  stationData: null
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
  [types.M_TRIP_FAILURE](state, payload) {
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
        commit(types.M_TRIP_FAILURE, error);
      });
  },
  actFetchCreateTrip({ commit }, trip) {
    commit(types.M_TRIP_REQUEST);
    api
      .post("/trips", trip)
      .then(response => {
        commit(types.M_TRIP_SUCCESS, response.data);
        router.replace("/admin/trips");
      })
      .catch(error => {
        commit(types.M_TRIP_FAILURE, error);
      });
  }
};

export default { state, mutations, actions };
