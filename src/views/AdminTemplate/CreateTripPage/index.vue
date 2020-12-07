<template>
  <a-form
    ref="ruleTripForm"
    :model="createTripForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <!-- Diem di -->
    <a-form-item ref="fromStationId" label="Bến xe khởi hành" name="fromStationId">
      <a-select v-model:value="createTripForm.fromStationId">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Diem den -->
    <a-form-item ref="toStationId" label="Bến xe kết thúc" name="toStationId">
      <a-select v-model:value="createTripForm.toStationId">
        <a-select-option v-for="s in listStations" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Gia ve -->
    <a-form-item ref="price" label="Giá vé" name="price">
      <a-input-number v-model:value="createTripForm.price" />
    </a-form-item>
    <!-- Nha xe -->
    <a-form-item ref="coach" label="Nhà xe" name="coach">
      <a-select v-model:value="createTripForm.coachId">
        <a-select-option v-for="s in listCoachs" :key="s" :value="s._id">
          {{ s.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- Bat dau -->
    <a-form-item ref="startTime" label="Giờ khở hành" name="startTime">
      <a-date-picker 
        show-time placeholder="Chọn giờ " 
        @change="handlePickStartTimeChange" @ok="handlePickStartTimeOk" 
      />
    </a-form-item>
    <!-- Submit -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :loading="$store.state.trip.loading"
      >
        Tạo chuyến đi
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Nhập lại
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
    let checkPrice = async (rule, value) => {
      if (!value) {
        return Promise.reject("Hãy nhập giá vé");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Giá vé không hợp lệ");
      } else {
        if (value < 0) {
          return Promise.reject("Giá vé phải lớn hơn 0");
        } else {
          return Promise.resolve();
        }
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      createTripForm: {
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
            message: "Hãy chọn bến xe xuất hành"
          }
        ],
        toStationId: [
          {
            required: true,
            message: "Hãy chọn điểm đến"
          }
        ],
        price: [{ validator: checkPrice, trigger: "change" }]
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
          console.log("error", error);
        });
    },
    resetForm() {
      this.$refs.ruleTripForm.resetFields();
    },
    handlePickStartTimeChange(startTime, dateString) {
      
      console.log('Selected Time: ', startTime);
      console.log('Formatted Selected Time: ', dateString);
    },
    handlePickStartTimeOk(value) {
      console.log('onOk: ', value);
      this.createTripForm.startTime = value;
    },
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
