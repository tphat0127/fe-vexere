import { api } from "./../../api";
import * as types from "./constant";
import router from "../../router";
import jwtDecode from "jwt-decode";
import setHeader from"./../../util/setHeader";

const state = {
    loading: false,
    token: null,
    error: null,
    modal_visible: false,
};

const mutations = {
    loginClicked(state) {
        state.modal_visible = true;
    },
    [types.M_LOGIN_REQUIRED]( state ) {
        state.token = null,
        state.error = null;
        state.loading = true;
        state.modal_visible = false;
    },
    [types.M_LOGIN_SUCCESS]( state, payload ) {
        state.token = payload;
        state.error = null;
        state.loading = false;
        state.modal_visible = false;
    },
    [types.M_LOGIN_FAILED]( state, payload) {
        state.token = null,
        state.error = payload,
        state.loading = false;
        state.modal_visible = true;
    },
    clearAuth(state) {
        state.token = null,
        state.error = null;
        state.loading = false;
    }
};

const actions = {
    actHandleLogin({ commit }) {
        commit("loginClicked")
    },
    [types.A_LOGIN]({ commit, dispatch }, authData) {
        commit("loginClicked")
        commit(types.M_LOGIN_REQUIRED);
        api.post("/users/login", {
            email: authData.email,
            password: authData.password
        })
        .then(response => {
            commit(types.M_LOGIN_SUCCESS, response.data.token);

            const user = jwtDecode(response.data.token);
            const exp = (user.exp - user.iat) * 1000;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("exp", user.exp);
            dispatch("actSetTimeoutLogout", exp);
            setHeader(response.data.token);
        })
        .catch(error => {
            commit(types.M_LOGIN_FAILED, error);
        });
    },
    actUserLogout({ commit }) {
        commit("clearAuth");
        localStorage.removeItem("token");
        localStorage.removeItem("exp");
        router.replace("/")
    },
    actSetTimeoutLogout({ dispatch }, exp) {
        setTimeout(() => {
            dispatch("actLogout")
        }, exp)
    },
    actTryLogin({ dispatch, commit }) {
        const token = localStorage.getItem("token");
        if(!token) {
            return;
        }
        const exp = localStorage.getItem("exp");
        const date = new Date();
        if(date.getTime() > exp*1000) {
            dispatch("actLogout");
            return;
        }
        setHeader(token);
        commit(types.M_LOGIN_SUCCESS);
    }
};

export default { state, mutations, actions }