<template>
  <template v-if="loading"><Loader /></template>
  <template v-else>
    <a-list item-layout="horizontal">
    <TripItem v-for="trip in data"
      :key="trip._id"
      :trip="trip"/>
  </a-list>
  <SeatList :trip_seats="data"/>
  </template>
</template>

<script>
import * as types from "./../../../store/trip/constant";
import Loader from "./../../../components/Loader";
import TripItem from "./../../../components/TripItem";
import SeatList from "./../../../components/SeatList";
export default {
  created() {
    this.$store.dispatch(
      types.A_FETCH_DETAIL_TRIP,
      this.$route.params.tripId
    );
  },
  computed: {
    data() {
      let arr = [];
      arr.push(this.$store.state.trip.data);
      return arr;
    },
    loading() {
      return this.$store.state.trip.loading;
    }
  },
  components: {
    Loader,
    TripItem,
    SeatList
  }
};
</script>

<style></style>
