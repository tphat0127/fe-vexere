import { api } from "../../api";
import router from "../../router";
import * as types from "./constant";

const state = {
  loading: false,
  data: null,
  error: null,
};

const mutations = {
  [types.M_COACH_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_COACH_SUCCESS](state, payload) {
    state.loading = false;
    state.data = payload;
    state.error = null;
  },
  [types.M_COACH_FAILURE](state, payload) {
    state.loading = false;
    state.data = null;
    state.error = payload;
  },
};

const actions = {
  [types.A_FETCH_DETAIL_COACH]({ commit }, id) {
    commit(types.M_COACH_REQUEST);
    api
      .get(`/coaches/${id}`)
      .then((response) => {
        commit(types.M_COACH_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_COACH_FAILURE, error);
      });
  },
  [types.A_FETCH_LIST_COACH]({ commit }) {
    commit(types.M_COACH_REQUEST);
    api
      .get("/coaches")
      .then((response) => {
        commit(types.M_COACH_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_COACH_FAILURE, error);
      });
  },
  actFetchCreateCoach({ commit }, coach) {
    commit(types.M_COACH_REQUEST);
    api
      .post("/coaches", coach)
      .then((response) => {
        commit(types.M_COACH_SUCCESS, response.data);
        router.replace("/admin/coaches");
      })
      .catch((error) => {
        commit(types.M_COACH_FAILURE, error);
      });
  },
  actFetchEditCoaches({ commit }, data) {
    commit(types.M_COACH_REQUEST);
    api
      .put(`/coaches/${data._id}`, data)
      .then((response) => {
        commit(types.M_COACH_SUCCESS, response.data);
        router.replace("/admin/coaches");
      })
      .catch((error) => {
        commit(types.M_COACH_FAILURE, error);
      });
  },
  actFetchDeleteCoach({ commit, dispatch }, id) {
    commit(types.M_COACH_REQUEST);
    api
      .delete(`/coaches/${id}`)
      .then(() => {
        dispatch(types.A_FETCH_LIST_COACH);
      })
      .catch((error) => {
        commit(types.M_COACH_FAILURE, error);
      });
  },
};

export default { state, mutations, actions };
