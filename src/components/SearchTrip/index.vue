<template>
  <div>
    <!-- Diem di -->
    <a-form-item>
      <a-select
        style="width: 240px"
        v-model:value="searchTripForm.fromStationId"
      >
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.province }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Diem den -->
    <a-form-item>
      <a-select style="width: 240px" v-model:value="searchTripForm.toStationId">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.province }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleSearchTrip" :loading="$store.state.trip.loading"
        >Tim</a-button
      >
    </a-form-item>
  </div>
</template>

<script>
import * as types from "./../../store/modules/constant";
import * as typesTrip from "./../../store/trip/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
  },
  data() {
    return {
      searchTripForm: {
        fromStationId: "",
        toStationId: ""
      },
    };
  },
  methods: {
    handleSearchTrip() {
      this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP, this.searchTripForm);
    },
  },
  computed: {
    listStations() {
      return this.$store.state.modules.data;
    },
    result() {
        console.log(this.$store.state.trip.data);
        return this.$store.state.trip.data;
    }
  },
};
</script>

<style></style>
