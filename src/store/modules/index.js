import { api } from "./../../api";
import router from "../../router";
import * as types from "./constant";

const state = {
    loading: false,
    data: null,
    error: null,
};

const mutations = {
    [types.M_STATION_REQUEST]( state ){
        state.loading = true;
        state.data = null;
        state.error = null;
    },
    [types.M_STATION_SUCCESS]( state, payload ){
        state.loading = false;
        state.data = payload;
        state.error = null;
    },
    [types.M_STATION_FAILURE]( state, payload ){
        state.loading = false;
        state.data = null;
        state.error = payload;
    }
}

const actions = {
    [types.A_FETCH_LIST_STATION]({ commit }){
        commit(types.M_STATION_REQUEST);
        api.get("/stations")
            .then((response) => {
                commit(types.M_STATION_SUCCESS, response.data);
            })
            .catch(error => {
                commit(types.M_STATION_FAILURE, error);
            });
    },
    [types.A_FETCH_DETAIL_STATION]({ commit }, id){
        commit(types.M_STATION_REQUEST);
        api.get(`/stations/${id}`)
            .then((response) => {
                commit(types.M_STATION_SUCCESS, response.data);
            })
            .catch(error => {
                commit(types.M_STATION_FAILURE, error);
            });
    },
    actFetchCreateStation({ commit }, station){
        commit(types.M_STATION_REQUEST);
        api.post("/stations", station)
            .then((response) => {
                commit(types.M_STATION_SUCCESS, response.data);
                router.replace("/admin/stations");
            })
            .catch((error) => {
                commit(types.M_STATION_FAILURE, error);
            });
    },
    actFetchDeleteStation({ commit, dispatch }, id) {
        commit(types.M_STATION_REQUEST);
        api.delete(`/stations/${id}`)
            .then(() => {
                dispatch(types.A_FETCH_LIST_STATION);
            })
            .catch((error) => {
                commit(types.M_STATION_FAILURE, error);
            });
    },
    actFetchEditStation({ commit }, data) {
        commit(types.M_STATION_REQUEST);
        api
          .put(`/stations/${data._id}`, data.station)
          .then((response) => {
            commit(types.M_STATION_SUCCESS, response.data);
            router.replace("/admin/stations");
          })
          .catch((error) => {
            commit(types.M_STATION_FAILURE, error);
          });
      },
}

export default { state, mutations, actions };