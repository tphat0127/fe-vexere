import { api } from "./../../api";
import setHeader from "./../../util/setHeader";
import * as types from "./constant";
import router from "../../router";
import jwtDecode from "jwt-decode";

const state = {
  token: null,
  error: null,
  loading: false,
  userData: null,
};

const mutations = {
  [types.M_LOGIN_REQUIRED](state) {
    (state.token = null), (state.error = null);
    state.loading = true;
  },
  [types.M_LOGIN_SUCCESS](state, payload) {
    state.token = payload;
    state.error = null;
    state.loading = false;
  },
  [types.M_LOGIN_FAILED](state, payload) {
    (state.token = null), (state.error = payload), (state.loading = false);
  },
  clearAuth(state) {
    (state.token = null), (state.error = null);
    state.loading = false;
  },
  [types.M_USER_DATA_REQUEST](state) {
    state.loading = true;
    state.userData = null;
    state.error = null;
  },
  [types.M_USER_DATA_SUCCESS](state, payload) {
    state.loading = false;
    state.userData = payload;
    state.error = null;
  },
  [types.M_USER_DATA_FAILURE](state, payload) {
    state.loading = false;
    state.userData = null;
    state.error = payload;
  },
};

const actions = {
  [types.A_LOGIN]({ commit, dispatch }, authData) {
    commit(types.M_LOGIN_REQUIRED);
    api
      .post("/users/login", {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        commit(types.M_LOGIN_SUCCESS, response.data.token);

        const user = jwtDecode(response.data.token);
        if (user.userType !== "Admin") {
          return Promise.reject({
            response: { data: { message: "User is not an admin" } },
          });
        }
        const exp = (user.exp - user.iat) * 1000;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("exp", user.exp);
        dispatch("actSetTimeoutLogout", exp);
        setHeader(response.data.token);
        router.replace("/admin/dashboard");
      })
      .catch((error) => {
        commit(types.M_LOGIN_FAILED, error);
      });
  },
  actLogout({ commit }) {
    commit("clearAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    router.replace("/auth");
  },
  actSetTimeoutLogout({ dispatch }, exp) {
    setTimeout(() => {
      dispatch("actLogout");
    }, exp);
  },
  actTryLogin({ dispatch, commit }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const exp = localStorage.getItem("exp");
    const date = new Date();
    if (date.getTime() > exp * 1000) {
      dispatch("actLogout");
      return;
    }
    setHeader(token);
    commit(types.M_LOGIN_SUCCESS);
  },
  [types.A_FETCH_ME]({ commit }) {
    commit(types.M_USER_DATA_REQUEST);
    api
      .get(`/me`)
      .then((response) => {
        commit(types.M_USER_DATA_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_USER_DATA_FAILURE, error);
      });
  },
};

export default { state, mutations, actions };
