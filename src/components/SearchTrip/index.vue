<template>
  <template v-if="$store.state.modules.loading"></template>
  <template v-else>
    <a-form style="box-shadow: 0 0 100px rgba(0,0,0,.08);">
      <a-input-group compact>
        <a-auto-complete
          :default-value="defaultFromValue"
          @select="onSelectFromStation"
          :options="options"
        >
          <a-input>
            <template #prefix
              ><EnvironmentFilled :style="{ fontSize: '1em', color: '#08c' }"
            /></template>
          </a-input>
        </a-auto-complete>
        <a-auto-complete
          :default-value="defaultToValue"
          @select="onSelectToStation"
          :options="options"
        >
          <a-input>
            <template #prefix
              ><EnvironmentFilled :style="{ fontSize: '1em', color: '#08c' }"
            /></template>
          </a-input>
        </a-auto-complete>
        <a-date-picker
          show-time
          @change="handlePickStartTimeChange"
          @ok="handlePickStartTimeOk"
          :default-value="moment(getCurrentTime, dateFormat)"
          :format="dateFormat"
        />
        <a-button
          class="btn-size"
          type="danger"
          @click="handleOnClickSearchTrip"
          :loading="$store.state.trip.loading"
          >TÌM</a-button
        >
      </a-input-group>
    </a-form>
  </template>
</template>
<script>
import * as types from "./../../store/modules/constant";
import * as typesTrip from "./../../store/trip/constant";
import { EnvironmentFilled } from "@ant-design/icons-vue";
import moment from "moment";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
  },
  components: {
    EnvironmentFilled
  },
  data() {
    return {
      searchTripForm: {
        fromProvince: "",
        toProvince: "",
        startTime: null
      },
      isOpen: {
        selectFromStation: null,
        selectToStation: null,
        pickStartTime: null
      },
      getCurrentTime: moment(),
      dateFormat: "DD/MM/YYY",
      defaultFromValue:
        JSON.parse(localStorage.getItem("tripSearchData")) !== null
          ? JSON.parse(localStorage.getItem("tripSearchData")).fromProvince
          : "Noi di",
      defaultToValue:
        JSON.parse(localStorage.getItem("tripSearchData")) !== null
          ? JSON.parse(localStorage.getItem("tripSearchData")).toProvince
          : "Diem den"
    };
  },
  methods: {
    handleOnClickSearchTrip() {
      this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP);
      this.$router.push("/result");
    },
    onSelectFromStation(value, option) {
      //this.isOpenSelectToStation = true;
      this.searchTripForm.fromProvince = option.value;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    onSelectToStation(value, option) {
      // this.isOpenSelectToStation = !this.isOpenSelectToStation;
      // this.isDateTime = !this.isDateTime;
      this.searchTripForm.toProvince = option.value;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    handlePickStartTimeChange(startTime, dateString) {
      console.log("Selected Time: ", startTime);
      console.log("Formatted Selected Time: ", dateString);
      //Auto open
      // this.isOpen.pickStartTime = false;
      // if(!this.defaultFromValue) {
      //   this.isOpen.selectFromStation = true;
      // }
      // console.log( this.isOpen.selectFromStation)
      /////////////////
      this.searchTripForm.startTime = dateString;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    handlePickStartTimeOk(value) {
      console.log("onOk: ", value);
      this.searchTripForm.startTime = value;
      this.handleOnClickSearchTrip();
    },
    moment
  },
  computed: {
    listStations() {
      return this.$store.state.modules.data;
    },
    options() {
      return this.listStations.map(o =>
        //ant: autocomple - optionLableProp bi loi =>
        Object.assign({}, o, {
          value: o.province,
          id: o._id
        })
      );
    }
  }
};
</script>
<style>
.ant-input {
  font-size: 18px;
}
.btn-size {
  font-size: 18px;
  height: 47px;
  width: 130px !important;
}
.ant-input-affix-wrapper {
  font-size: 24px;
}
.ant-select-single .ant-select-selector .ant-select-selection-search-input {
  text-align: center;
}
.ant-calendar-picker-input.ant-input {
  height: 47px;
}
</style>
