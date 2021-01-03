<template>
  <a-row>
    <template v-if="$store.state.modules.loading"></template>
    <template v-else>
      <a-form style="box-shadow: 0 0 100px rgba(0,0,0,.08);">
        <a-input-group compact>
          <a-auto-complete
            style="width: 30%"
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
            style="width: 30%"
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
            style="width: 20%"
            show-time
            @change="handlePickStartTimeChange"
            @ok="handlePickStartTimeOk"
            :default-value="moment(getCurrentTime, dateFormat)"
            :format="dateFormat"
          />
          <a-button
            style="width: 15%"
            class="btn-size"
            type="danger"
            @click="handleOnClickSearchTrip"
            :loading="$store.state.trip.loading"
            >TÌM</a-button
          >
        </a-input-group>
      </a-form>
    </template>
  </a-row>
</template>
<script>
import { Modal } from "ant-design-vue";
import { h } from "vue";
import * as types from "./../../store/modules/constant";
import * as typesTrip from "./../../store/trip/constant";
import { EnvironmentFilled } from "@ant-design/icons-vue";
import moment from "moment";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
  },
  components: {
    EnvironmentFilled,
  },
  data() {
    return {
      searchTripForm: {
        fromProvince: "",
        toProvince: "",
        startTime: moment().format("DD/MM/YYYY"),
      },
      isOpen: {
        selectFromStation: null,
        selectToStation: null,
        pickStartTime: null,
      },
      getCurrentTime: moment(),
      dateFormat: "DD/MM/YYYY",
      defaultFromValue:
        JSON.parse(localStorage.getItem("tripSearchData")) !== null
          ? JSON.parse(localStorage.getItem("tripSearchData")).fromProvince
          : "Điểm xuất phát",
      defaultToValue:
        JSON.parse(localStorage.getItem("tripSearchData")) !== null
          ? JSON.parse(localStorage.getItem("tripSearchData")).toProvince
          : "Điểm đến",
    };
  },
  methods: {
    handleOnClickSearchTrip() {
      let storageTrip = JSON.parse(localStorage.getItem("tripSearchData"));
      if (storageTrip !== null) {
        if (storageTrip.fromProvince == "") {
          Modal.info({
            title: "Bạn chưa chọn điểm đi",
            content: h("div", {}, [h("p", "Cần chọn tỉnh thành")]),
            onOk() {},
          });
          return;
        }
        if (storageTrip.toProvince == "") {
           Modal.info({
            title: "Bạn chưa chọn điểm đến",
            content: h("div", {}, [h("p", "Cần chọn tỉnh thành")]),
            onOk() {},
          });
          return;
        }
      } else {
         Modal.info({
            title: "Bạn chưa chọn điểm đi và điểm đến",
            content: h("div", {}, [h("p", "Cần chọn điểm đi và điểm đến")]),
            onOk() {},
          });
          return;
      }
      this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP);
      this.$router.push("/result");
    },
    onSelectFromStation(value, option) {
      this.searchTripForm.fromProvince = option.value;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    onSelectToStation(value, option) {
      this.searchTripForm.toProvince = option.value;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    handlePickStartTimeChange(startTime, dateString) {
      console.log("Selected Time: ", startTime);
      console.log("Formatted Selected Time: ", dateString);
      this.searchTripForm.startTime = dateString;
      localStorage.setItem(
        "tripSearchData",
        JSON.stringify(this.searchTripForm)
      );
    },
    handlePickStartTimeOk(value) {
      console.log("onOk: ", value);
      this.searchTripForm.startTime = moment(value).format("DD/MM/YYYY");
      this.handleOnClickSearchTrip();
    },
    moment,
  },
  computed: {
    listStations() {
      return this.$store.state.modules.data;
    },
    options() {
      return this.listStations.map((o) =>
        //ant: autocomple - optionLableProp bi loi =>
        Object.assign({}, o, {
          value: o.province,
          id: o._id,
        })
      );
    },
  },
};
</script>
<style>
.ant-input {
  font-size: 18px;
}
.btn-size {
  font-size: 18px;
  height: 47px;
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
