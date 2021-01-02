import { api } from "../../api";
import * as types from "./constant";
import router from "../../router";
import jwtDecode from "jwt-decode";
import setHeader from "./../../util/setHeader";
const state = {
  loading: false,
  data: null,
  error: null,
  token: null,
  isLoggedIn: false,
};

const mutations = {
  [types.M_USER_REQUEST](state) {
    state.loading = true;
    state.data = null;
    state.error = null;
  },
  [types.M_USER_SUCCESS](state, payload) {
    state.loading = false;
    state.data = payload;
    state.error = null;
  },
  [types.M_USER_FAILURE](state, payload) {
    state.loading = false;
    state.dataUser = null;
    state.error = payload;
  },
  [types.M_LOGIN_REQUIRED](state) {
    (state.token = null), (state.error = null);
    state.loading = true;
    state.modal_visible = false;
    state.isLoggedIn = false;
  },
  [types.M_LOGIN_SUCCESS](state, payload) {
    state.token = payload;
    state.error = null;
    state.loading = false;
    state.modal_visible = false;
    state.isLoggedIn = true;
  },
  [types.M_LOGIN_FAILED](state, payload) {
    (state.token = null), (state.error = payload), (state.loading = false);
    state.modal_visible = true;
    state.isLoggedIn = false;
  },
  clearAuth(state) {
    (state.token = null), (state.error = null);
    state.loading = false;
    state.isLoggedIn = false;
  },
};

const actions = {
  [types.A_FETCH_REGISTRATION]({ commit, dispatch }, user) {
    commit(types.M_USER_REQUEST);
    api
      .post("/users", user)
      .then((response) => {
        commit(types.M_USER_SUCCESS, response.data);
      })
      .then(() => {
        dispatch(types.A_LOGIN, user);
      })
      .catch((error) => {
        commit(types.M_USER_FAILURE, error);
      });
  },
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
        const exp = (user.exp - user.iat) * 1000;
        localStorage.setItem("token", response.data.token);
        
        localStorage.setItem("exp", user.exp);
        dispatch("actSetTimeoutLogout", exp);
        setHeader(response.data.token);
      })
      .catch((error) => {
        commit(types.M_LOGIN_FAILED, error);
      });
  },
  actUserLogout({ commit }) {
    commit("clearAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    router.replace("/");
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
    commit(types.M_USER_REQUEST);
    api
    .get(`/me`)
      .then(response => {
        commit(types.M_USER_SUCCESS, response.data);
      })
      .catch(error => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  actUpdatePassword({ commit }, data){
    commit(types.M_USER_REQUEST);
    api
      .patch("/users/update-pwd", data)
      .then((response) => {
        commit(types.M_USER_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  /////////////////////ADMIN TEMPLATE //////////////////
  [types.A_FETCH_LIST_USER]({ commit }) {
    commit(types.M_USER_REQUEST);
    api
      .get("/users")
      .then(response => {
        commit(types.M_USER_SUCCESS, response.data);
      })
      .catch(error => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  [types.A_FETCH_DETAIL_USER]({ commit }, id) {
    commit(types.M_USER_REQUEST);
    api
    .get(`/users/${id}`)
      .then(response => {
        commit(types.M_USER_SUCCESS, response.data);
      })
      .catch(error => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  
  actFetchDeleteUser({ commit, dispatch }, id) {
    commit(types.M_USER_REQUEST);
    api
      .delete(`/users/${id}`)
      .then(() => {
        dispatch(types.A_FETCH_LIST_USER);
      })
      .catch((error) => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  actFetchEditUser({ commit }, data) {
    commit(types.M_USER_REQUEST);
    api
      .put(`/users/${data._id}`, data)
      .then((response) => {
        commit(types.M_USER_SUCCESS, response.data);
        router.replace("/admin/users");
      })
      .catch((error) => {
        commit(types.M_USER_FAILURE, error);
      });
  },
  actFetchCreateUser({ commit }, user) {
    commit(types.M_USER_REQUEST);
    api
      .post("/users", user)
      .then((response) => {
        commit(types.M_USER_SUCCESS, response.data);
        router.replace("/admin/users");
      })
      .catch((error) => {
        commit(types.M_USER_FAILURE, error);
      });
  },
};

export default { state, mutations, actions };
