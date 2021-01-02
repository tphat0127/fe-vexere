<template>
  <a-row >
    <a-col :span="12" :offset="6">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="/">Trang chủ</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Chyến đi</a></a-breadcrumb-item>
        <a-breadcrumb-item>{{ searchTripForm.fromProvince }} -
          {{ searchTripForm.toProvince }}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-row>
        <SearchTrip />
      </a-row>
      <a-row>
        <h2>
          Vé xe từ {{ searchTripForm.fromProvince }} -
          {{ searchTripForm.toProvince }}
        </h2>
      </a-row>
      <a-list type="flex" :gutter="16" bordered>
        <a-list-item>
          <a-col :span="8">
            <span style="font-weight: bold; margin: 3px">Bộ lọc tìm kiếm</span>
            <a-tag
              color="orange"
              closable
              @close="
                () => {
                  filterValue.price = [0, 2000000];
                  onAfterChangePrice(filterValue.price);
                  this.isShowTag.priceTag = false;
                }
              "
              :visible="isShowTag.priceTag"
            >
              Giá vé: {{ filterValue.price[0] }} - {{ filterValue.price[1] }}
            </a-tag>
            <a-tag
              color="cyan"
              closable
              @close="
                () => {
                  filterValue.seat = [0, 50];
                  onAfterChangeSeat(filterValue.seat);
                  this.isShowTag.seatTag = false;
                }
              "
              :visible="isShowTag.seatTag"
            >
              Số chỗ trống: {{ filterValue.seat[0] }} -
              {{ filterValue.seat[1] }}
            </a-tag>
            <a-tag
              size="large"
              closable
              color="purple"
              @close="
                () => {
                  filterValue.time = [0, 24];
                  onAfterChangeTime(filterValue.time);
                  this.isShowTag.timeTag = false;
                }
              "
              :visible="isShowTag.timeTag"
            >
              Giờ đi: {{ filterValue.time[0] }} - {{ filterValue.time[1] }}
            </a-tag>
          </a-col>
          <a-col :span="4">
            <a-list-item-meta>
              <template #title>
                Giá vé
              </template>
              <template #description>
                <a-slider
                  v-model:value="filterValue.price"
                  range
                  :step="5000"
                  :min="0"
                  :max="2000000"
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
                  v-model:value="filterValue.seat"
                  range
                  :step="1"
                  :min="0"
                  :max="40"
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
                  v-model:value="filterValue.time"
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
        </a-list-item>
      </a-list>
      <a-row>
        <h2></h2>
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
  <a-row  v-else>
    <a-col a-col :span="12" :offset="6">
      <a-list bordered>
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
      o =>
        o.fromStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
        o.toStationId.province ==
          JSON.parse(localStorage.getItem("tripSearchData")).toProvince &&
        moment(o.startTime).format("DD/MM/yyyy") ==
          JSON.parse(localStorage.getItem("tripSearchData")).startTime
    );
  },
  data() {
    return {
      searchTripForm: JSON.parse(localStorage.getItem("tripSearchData")),
      filterResult: null,
      filterValue: {
        price: [0, 2000000],
        time: [0, 24],
        seat: [0, 50]
      },
      isShowTag: {
        priceTag: false,
        seatTag: false,
        timeTag: false
      }
    };
  },
  components: {
    SearchTrip,
    TripItem
  },
  methods: {
    onAfterChangePrice(value) {
      this.isShowTag.priceTag = true;
      this.filterValue.price = [value[0], value[1]];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        o =>
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
      this.filterValue.seat = [value[0], value[1]];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        o =>
          _.size(_.filter(o.seats, i => i.isBooked == false)) >= value[0] &&
          _.size(_.filter(o.seats, i => i.isBooked == false)) <= value[1] &&
          o.fromStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
          o.toStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).toProvince
      );
    },
    onAfterChangeTime(value) {
      this.isShowTag.timeTag = true;
      this.filterValue.time = [value[0], value[1]];
      this.filterResult = _.filter(
        this.$store.state.trip.data,
        o =>
          moment(o.startTime).format("hh") >= value[0] &&
          moment(o.startTime).format("hh") <= value[1] &&
          o.fromStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).fromProvince &&
          o.toStationId.province ==
            JSON.parse(localStorage.getItem("tripSearchData")).toProvince
      );
    },
    moment
  },
  computed: {
    listTrip() {
      return this.$store.state.trip.data;
    }
  }
};
</script>

<style>
.ant-list-bordered {
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
}
</style>
