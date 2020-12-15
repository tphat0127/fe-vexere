
<template>
  
  <a-row type="flex" justify="center" >
    <a-col :span="12" :offset="6">
      <a-row type="flex" justify="center">
        <SearchTrip />
      </a-row>
      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4">
          Số chỗ trống
          <a-slider
            range
            :step="5000"
            :min="0"
            :max="2000000"
            :default-value="[0, 2000000]"
            @afterChange="onAfterChangePrice"
        /></a-col>
        <a-col :span="4">
          gio khoi hanh
          <a-slider
            range
            :step="5000"
            :min="0"
            :max="2000000"
            :default-value="[0, 2000000]"
            @afterChange="onAfterChangePrice"
          />
        </a-col>
        <a-col :span="4">
          Gia ve
          <a-slider
            range
            :step="5000"
            :min="0"
            :max="2000000"
            :default-value="[0, 2000000]"
            @afterChange="onAfterChangePrice"
          />
        </a-col>
        <a-col :span="6" :offset="6">
          Bo loc
        </a-col>
      </a-row>

      <a-row>
        <h2>
          Ve xe tu {{ searchTripForm.fromProvince }} -
          {{ searchTripForm.toProvince }}
        </h2>
      </a-row>
      <template v-if="$store.state.trip.loading"> </template>
      <a-list item-layout="horizontal" bordered type="flex" v-else>
        <TripItem v-for="trip in filterResult" :key="trip._id" :trip="trip" />
      </a-list>
    </a-col>
    <a-col :span="6" />
  </a-row>
</template>

<script>
import _ from "lodash";
import SearchTrip from "./../../../components/SearchTrip";
import TripItem from "./../../../components/TripItemHome";
import * as typesTrip from "./../../../store/trip/constant";
export default {
  created() {
    this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP);
  },
  updated() {
    (this.filterResult = _.filter(
      this.listTrip,
      (o) =>
        o.fromStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
        o.toStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).toProvince
    )),
      console.log(this.filterResult);
  },
  data() {
    return {
      searchTripForm: JSON.parse(localStorage.getItem("tripSearchData")),
      filterResult: null,
    };
  },
  components: {
    SearchTrip,
    TripItem,
  },
  methods: {
    loadData() {
      //this.filterResult = this.listTrip;
      console.log("mounted");
    },
    filter() {
      // console.log(this.filterResult);
      // this.filterResult = _.filter(
      //   this.filterResult,
      //   (o) => o.price > 2000 && o.price < 90000
      // );
    },
    onAfterChangePrice() {
      //onAfterChangePrice(value)
      // this.filterResult = _.filter(
      //   this.$store.state.trip.data,
      //   (o) => o.price > value[0] && o.price < value[1]
      // );
    },
  },
  computed: {
    listTrip() {
      return this.$store.state.trip.data;
    },
  },
};
</script>

<style>
.ant-list-bordered {
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
}
</style>
