<template>
  <template v-if="loading">
    <Loader />
  </template>
  <template v-else>
    <a-row :gutter="16" type="flex" justify="center" align="middle">
      <StationItem
        v-for="station in data"
        :key="station._id"
        :station="station"
      />
    </a-row>
  </template>
</template>

<script>
import Loader from "./../../../components/Loader";
import StationItem from "./../../../components/StationItem";
import * as types from "./../../../store/station/constant";
export default {
  components: {
    Loader,
    StationItem
  },
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
  },
  computed: {
    loading() {
      return this.$store.state.station.loading;
    },
    data() {
      return this.$store.state.station.data;
    }
  }
};
</script>

<style></style>
