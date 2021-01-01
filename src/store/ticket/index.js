import { api } from "../../api";
import * as types from "./constant";

const state = {
  loading: false,
  data: null,
  error: null,
};

const mutations = {
  [types.M_TICKET_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_TICKET_SUCCESS](state, payload) {
    state.loading = false;
    state.data = payload;
    state.error = null;
  },
  [types.M_TICKET_FAILURE](state, payload) {
    state.loading = false;
    state.data = null;
    state.error = payload;
  },
};

const actions = {
  [types.A_FETCH_LIST_TICKET]({ commit }) {
    commit(types.M_TICKET_REQUEST);
    api
      .get("/tickets")
      .then((response) => {
        commit(types.M_TICKET_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_TICKET_FAILURE, error);
      });
  },
  actFetchDeleteTicket({ commit, dispatch }, id) {
    commit(types.M_TICKET_REQUEST);
    api
      .delete(`/tickets/${id}`)
      .then(() => {
        dispatch(types.A_FETCH_LIST_TICKET);
      })
      .catch((error) => {
        commit(types.M_TICKET_REQUEST, error);
      });
  },
  actFetchBookTicket({ commit }, ticket) {
    commit(types.M_TICKET_REQUEST);
    api
      .post("/tickets/book/", ticket)
      .then((response) => {
        commit(types.M_TICKET_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_TICKET_FAILURE, error);
      });
  },
};

export default { state, mutations, actions };
