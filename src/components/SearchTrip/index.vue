//ngay hien tai
<template>
  <template v-if="$store.state.modules.loading"></template>
  <template v-else>
    <a-form>
      <a-input-group compact>
        <a-auto-complete
          default-value="Nơi đi"
          @select="onSelectFromStation"
          :options="options"
          style="width: 15%"
        >
          <a-input>
            <template #prefix
              ><EnvironmentFilled :style="{fontSize: '1em', color: '#08c'}"
            /></template>
          </a-input>
        </a-auto-complete>
        <a-auto-complete
          default-value="Điểm đến"
          @select="onSelectToStation"
          :options="options"
          style="width: 15%"
          :open="isOpenSelectToStation"
        >
        <a-input>
            <template #prefix
              ><EnvironmentFilled :style="{fontSize: '1em', color: '#08c'}"
            /></template>
          </a-input>
        </a-auto-complete>
        <a-date-picker style="width: 13%"
        show-time
        @change="handlePickStartTimeChange" 
        @ok="handlePickStartTimeOk" 
        :default-value="moment(getCurrentTime, dateFormat)" 
        :format="dateFormat"
        :open="isDateTime">
           
        </a-date-picker>
        <a-button
        type="danger"
          @click="handleOnClickSearchTrip"
          :loading="$store.state.trip.loading"
          style="width: 12%"
          >TÌM</a-button
        >
      </a-input-group>
    </a-form>
  </template>
</template>
<script>
import * as types from "./../../store/modules/constant";
import * as typesTrip from "./../../store/trip/constant";
import { EnvironmentFilled,  } from "@ant-design/icons-vue";
import moment from 'moment';
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
        fromStationId: "",
        toStationId: "",
        province: "",
        startTime: null
      },
      isOpenSelectToStation: null,
      isDateTime: false,
      getCurrentTime: moment(),
      dateFormat: 'DD/MM/YYY',
    };
  },
  methods: {
    handleOnClickSearchTrip() {
      this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP, this.searchTripForm);
    },

    onSelectFromStation(value, option) {
      this.isOpenSelectToStation = true;
      this.searchTripForm.fromStationId = option.id;
    },
    onSelectToStation(value, option) {
      this.isOpenSelectToStation = !this.isOpenSelectToStation;
      this.isDateTime = !this.isDateTime;
      this.searchTripForm.toStationId = option.id;
    },
    handlePickStartTimeChange(startTime, dateString) {
      console.log('Selected Time: ', startTime);
      console.log('Formatted Selected Time: ', dateString);
    },
    handlePickStartTimeOk(value) {
      console.log('onOk: ', value);
      this.searchTripForm.startTime = value;
      this.$store.dispatch(typesTrip.A_FETCH_SEARCH_TRIP, this.searchTripForm);
      this.isDateTime = !this.isDateTime;
    },
    moment
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
.ant-btn {
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
