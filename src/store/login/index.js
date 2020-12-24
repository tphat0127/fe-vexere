import { api } from "./../../api";
import * as types from "./constant";
//import router from "../../router";
//import jwtDecode from "jwt-decode";

const state = {
    loading: false,
    data: null,
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
    }
};

const actions = {
    actHandleLogin({ commit }) {
        commit("loginClicked")
    },
    [types.A_LOGIN]({ commit }, authData) {
        commit(types.M_LOGIN_REQUIRED);
        api.post("/users/login", {
            email: authData.email,
            password: authData.password
        })
        .then(response => {
            commit(types.M_LOGIN_SUCCESS, response.data.token);
            localStorage.setItem("token", response.data.token);
            //router.replace("/");
        })
        .catch(error => {
            commit(types.M_LOGIN_FAILED, error);
        });
    }
};

export default { state, mutations, actions }