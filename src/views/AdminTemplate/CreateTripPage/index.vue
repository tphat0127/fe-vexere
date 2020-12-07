<template>
  <a-form
    ref="ruleTripForm"
    :model="createTripForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- Diem di -->
    <a-form-item ref="fromStation" label="From Station" name="fromStation">
      <a-select v-model:value="createTripForm.fromStationId" style="width: 120px" @change="handleChangeFromStation">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Diem den -->
    <a-form-item ref="toStation" label="From Station" name="toStation">
      <a-select v-model:value="createTripForm.toStationId" style="width: 120px">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Gia ve -->
    <a-form-item ref="price" label="price" name="price">
      <a-input v-model:value="createTripForm.price" />
    </a-form-item>
    <!-- Nha xe -->
    <a-form-item ref="coach" label="Nha xe" name="coach">
      <a-select v-model:value="createTripForm.coachId" style="width: 120px">
        <a-select-option v-for="s in listCoachs" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Bat dau -->
    <a-form-item ref="startTime" label="startTime" name="startTime">
      <a-date-picker
        v-model:value="createTripForm.startTime"
        @change="handlePickStartTime"
      />
    </a-form-item>
    <!-- Ket thuc -->
    <a-form-item ref="endTime" label="endTime" name="endTime">
      <a-date-picker 
        v-model:value="createTripForm.endTime" 
        @change="handlePickEndTime" />
    </a-form-item>
    <!-- Submit -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :loading="$store.state.trip.loading"
      >
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import * as types from "./../../../store/modules/constant";
import * as types_coach from "./../../../store/coach/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
    this.$store.dispatch(types_coach.A_FETCH_LIST_COACH);
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      createTripForm: {
        fromStationId: "",
        toStationId: "",
        price: "",
        coachId: "",
        startTime: null,
        endTime: null
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleTripForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchCreateTrip", this.createTripForm);
        })
        .catch(error => {
          console.log('error', error);
        });
    },
    resetForm() {
      this.$refs.ruleTripForm.resetFields();
    },
    handleChangeFromStation(){
      console.log(`selected ${this.createTripForm.fromStationId}`);
    },
    handlePickStartTime(startTime) {
      this.createTripForm.startTime = startTime;
    },
    handlePickEndTime(endTime, dateString) {
      this.createTripForm.endTime = endTime;
      console.log(endTime, dateString);
    }
  },
  computed: {
    listStations() {
      console.log(this.$store.state.modules.data);
      return this.$store.state.modules.data;
    },
    listCoachs() {
      console.log(this.$store.state.coach.coachData);
      return this.$store.state.coach.coachData;
    }
  }
};
</script>
