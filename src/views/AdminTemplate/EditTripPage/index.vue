<template>
  <template v-if="loading || this.$store.state.coach.loading || this.$store.state.station.loading"><Loader /></template>
  <template v-else>
    <h2>Update Trip</h2>
    <a-form
    ref="ruleTripForm"
    :model="editTripForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <!-- Diem di -->
    <a-form-item
      ref="fromStationId"
      label="From station"
      name="fromStationId"
    >
      <a-select v-model:value="editTripForm.fromStationId" defaultValue="ddd">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Diem den -->
    <a-form-item ref="toStationId" label="To station" name="toStationId">
      <a-select v-model:value="editTripForm.toStationId">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Gia ve -->
    <a-form-item ref="price" label="Price" name="price">
      <a-input-number v-model:value="editTripForm.price" />
    </a-form-item>
    <!-- Nha xe -->
    <a-form-item ref="coach" label="Coach" name="coach">
      <a-select v-model:value="editTripForm.coachId">
        <a-select-option v-for="s in listCoachs" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Bat dau -->
    <a-form-item ref="startTime" label="Start time" name="startTime">
      <a-date-picker
        show-time
        :placeholder="editTripForm.startTime"
        @change="handlePickStartTimeChange"
        @ok="handlePickStartTimeOk"
      />
    </a-form-item>
    <!-- Submit -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :loading="$store.state.trip.loading"
      >
        Edit
      </a-button>
    </a-form-item>
  </a-form>
  </template>
</template>
<script>
import * as types from "./../../../store/modules/constant";
import * as types_coach from "./../../../store/coach/constant";
import * as types_trip from "./../../../store/trip/constant";
import Loader from "./../../../components/Loader";
export default {
  beforeCreate() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
    this.$store.dispatch(types_coach.A_FETCH_LIST_COACH);
    this.$store.dispatch(
      types_trip.A_FETCH_DETAIL_TRIP,
      this.$route.params.tripId
    );
  },
  data() {
    let checkPrice = async (rule, value) => {
      if (!value) {
        return Promise.reject("Please input price");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Price is invalid");
      } else {
        if (value < 0) {
          return Promise.reject("Price more thanh 0");
        } else {
          return Promise.resolve();
        }
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      editTripForm: {
        fromStationId: "",
        toStationId: "",
        price: "",
        coachId: "",
        startTime: null,
      },
      rules: {
        fromStationId: [
          {
            required: true,
            message: "Please input from station",
          },
        ],
        toStationId: [
          {
            required: true,
            message: "Plesae input to station",
          },
        ],
        price: [{ validator: checkPrice, trigger: "change" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleTripForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchCreateTrip", this.editTripForm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    handlePickStartTimeChange(startTime, dateString) {
      this.editTripForm.startTime = startTime;
      console.log("Selected Time: ", startTime);
      console.log("Formatted Selected Time: ", dateString);
    },
    handlePickStartTimeOk(value) {
      console.log("onOk: ", value);
      this.editTripForm.startTime = value;
    },
  },
  computed: {
    listStations() {
      return this.$store.state.modules.data;
    },
    loading() {
      return this.$store.state.trip.loading;
    },
    listCoachs() {
      return this.$store.state.coach.data;
    },
    tripDetail() {
      return this.$store.state.trip.data;
    },
  },
  watch: {
    tripDetail() {
      this.editTripForm.price = this.tripDetail.price;
      this.editTripForm.startTime = this.tripDetail.startTime;
    },
  },
  components: {
    Loader,
  },
};
</script>
