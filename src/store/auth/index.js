import { api } from "./../../api";
import * as types from "./constant";
import router from "../../router";
import jwtDecode from "jwt-decode";

const state = {
    token: null,
    error: null,
    loading: false,
};

const mutations = {
    [types.M_LOGIN_REQUIRED]( state ) {
        state.token = null,
        state.error = null;
        state.loading = true;
    },
    [types.M_LOGIN_SUCCESS]( state, payload ) {
        state.token = payload;
        state.error = null;
        state.loading = false;
    },
    [types.M_LOGIN_FAILED]( state, payload) {
        state.token = null,
        state.error = payload,
        state.loading = false;
    }
};

const actions = {
    [types.A_LOGIN]({ commit }, authData) {
        commit(types.M_LOGIN_REQUIRED);
        api.post("/users/login", {
            email: authData.email,
            password: authData.password
        })
        .then(response => {
            commit(types.M_LOGIN_SUCCESS, response.data.token);

            const user = jwtDecode(response.data.token);
            if(user.userType !== "Admin") {
                return Promise.reject({
                    response: { data: { message: "User is not an admin" } },
                });
            }
            localStorage.setItem("token", response.data.token);
            router.replace("/admin/dashboard");
        })
        .catch(error => {
            commit(types.M_LOGIN_FAILED, error);
        });
    }
}

export default { state, mutations, actions }