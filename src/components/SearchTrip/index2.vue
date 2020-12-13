<template>
  <a-auto-complete
    v-model:value="value"
    class="certain-category-search"
    dropdown-class-name="certain-category-search-dropdown"
    :dropdown-match-select-width="false"
    :dropdown-style="{ width: '300px' }"
    size="large"
    style="width: 100%"
    placeholder="input here"
    option-label-prop="value"
  >
    <template #dataSource>
      <a-select
        style="width: 240px"
        v-model:value="searchTripForm.fromStationId"
      >
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.province }}
        </a-select-option>
      </a-select>
    </template>
  </a-auto-complete>
  <a-button @click="handleSearchTrip" :loading="$store.state.trip.loading"
    >Tim</a-button
  >
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
        toStationId: "",
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
    },
  },
};
</script>

<style></style>
<template #dataSource>
        <a-select-option v-for="s in listStations" :key="s._id" :value="s.province" @change="handleChange(s._id)">
          {{ s.province }}
        </a-select-option>
      </template>