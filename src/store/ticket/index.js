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
