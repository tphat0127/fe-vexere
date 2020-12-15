
<template>
  <a-row type="flex" justify="center">
    <a-col :span="12" :offset="6">
      <a-row type="flex" justify="center">
        <SearchTrip />
      </a-row>
      <a-list type="flex" :gutter="16" bordered>
        <a-list-item>
          <a-col :span="4">
            <a-list-item-meta>
              <template #title>
                Giá vé
              </template>
              <template #description>
                <a-slider
                  range
                  :step="5000"
                  :min="0"
                  :max="2000000"
                  :v-model="[500000, 1500000]"
                  @afterChange="onAfterChangePrice"
                />
              </template>
            </a-list-item-meta>
          </a-col>
          <a-col :span="4">
            <a-list-item-meta>
              <template #title>
                Số ghế
              </template>
              <template #description>
                <a-slider
                  range
                  :step="1"
                  :min="0"
                  :max="40"
                  :default-value="[0, 50]"
                  @afterChange="onAfterChangeSeat"
                />
              </template>
            </a-list-item-meta>
          </a-col>
          <a-col :span="4">
            <a-list-item-meta>
              <template #title>
                Giờ đi
              </template>
              <template #description>
                <a-slider
                  range
                  :step="1"
                  :min="0"
                  :max="24"
                  :default-value="[0, 24]"
                  @afterChange="onAfterChangeTime"
                />
              </template>
            </a-list-item-meta>
          </a-col>
          <a-col :span="8">
            <a-tag 
            color="orange" 
            closable 
            @closeTagPrice="filterValue.fromPrice = 0; filterValue.toPrice = 2000000"
            v-show="isShowTag.priceTag" >
              Giá vé: {{ filterValue.fromPrice}} - {{ filterValue.toPrice}}
            </a-tag>
            <a-tag 
            color="cyan"
            closable 
            @closeTagSeat="filterValue.fromSeat = 0; filterValue.toSeat = 50"
            v-show="isShowTag.seatTag" >
              Số chỗ trống: {{ filterValue.fromSeat}} - {{ filterValue.toSeat}}
            </a-tag>
            <a-tag 
            size="large" 
            closable 
            color="purple"
            @closeTagTime="filterValue.fromTime = 0; filterValue.toTime = 24"
            v-show="isShowTag.timeTag" >
              Giờ đi: {{ filterValue.fromTime}} - {{ filterValue.toTime}}
            </a-tag>
          </a-col>
        </a-list-item>
      </a-list>

      <a-row>
        <h2>
          Ve xe tu {{ searchTripForm.fromProvince }} -
          {{ searchTripForm.toProvince }}
        </h2>
      </a-row>
    </a-col>

    <a-col :span="6" />
  </a-row>

  <template v-if="$store.state.trip.loading">
    <a-row type="flex" justify="center">
      <a-col :span="12" :offset="6">
        <a-list item-layout="horizontal" bordered type="flex">
          <a-list-item type="flex" justify="space-around" align="middle">
            <a-skeleton active avatar> </a-skeleton>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="6" />
    </a-row>
  </template>
  <a-row type="flex" justify="center" v-else>
    <a-col :span="12" :offset="6">
      <a-list item-layout="horizontal" bordered type="flex">
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
import moment from "moment";
export default {
  created() {
    this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP);
  },
  beforeUpdate() {
    this.filterResult = _.filter(
      this.listTrip,
      (o) =>
        o.fromStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
        o.toStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).toProvince
    );
  },
  data() {
    return {
      searchTripForm: JSON.parse(localStorage.getItem("tripSearchData")),
      filterResult: null,
      filterValue: {
        toTime: 0,
        fromTime: 24,
        toSeat: 0,
        fromSeat: 50,
        fromPrice: 0,
        toPrice: 2000000
      },
      isShowTag: {
        priceTag: false,
        seatTag: false,
        timeTag: false,
      },
      sliderValue: {

      }
    };
  },
  components: {
    SearchTrip,
    TripItem,
  },
  methods: {
    onAfterChangePrice(value) {
      this.isShowTag.priceTag = true;
      this.filterValue.fromPrice = value[0];
      this.filterValue.toPrice = value[1];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        (o) =>
          o.price >= value[0] &&
          o.price <= value[1] &&
          o.fromStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
          o.toStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).toProvince
      );
    },
    onAfterChangeSeat(value) {
      this.isShowTag.seatTag = true;
      this.filterValue.fromSeat = value[0];
      this.filterValue.toSeat = value[1];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        (o) =>
          _.size(_.filter(o.seats, (i) => i.isBooked == false)) >= value[0] &&
          _.size(_.filter(o.seats, (i) => i.isBooked == false)) <= value[1] &&
          o.fromStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
          o.toStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).toProvince
      );
    },
    onAfterChangeTime(value) {
      this.isShowTag.timeTag = true;
      this.filterValue.fromTime = value[0];
      this.filterValue.toTime = value[1];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        (o) =>
          moment(o.startTime).format("hh") >= value[0] &&
          moment(o.startTime).format("hh") <= value[1] &&
          o.fromStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
          o.toStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).toProvince
      );
    },
    moment,
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
