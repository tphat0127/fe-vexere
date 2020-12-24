<template>
  <div style="width: 100%;">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-if="current == 0">
        <SeatList :trip_seats="data" :price="bookTrip.price" @send-listseat="handleBooking2(list)"/>
    {{ ticket.tripId}}
    {{ ticket.seats}}
      </div>
      <div v-else-if="current == 1">
        <a-form
          ref="ruleStationForm"
          :model="bookTiketForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item ref="email" label="Email" name="email">
            <a-input v-model:value="bookTiketForm.email" />
          </a-form-item>
          <a-form-item ref="fullName" label="Họ tên" name="fullName">
            <a-input v-model:value="bookTiketForm.fullName" />
          </a-form-item>
          <a-form-item ref="phoneNumber" label="Số điện thoại" name="phoneNumber">
            <a-input v-model:value="bookTiketForm.phoneNumber" />
          </a-form-item>
        </a-form>
      </div>
      <div v-else>
        xxxxxxxxx
      </div>
    </div>
    <div class="steps-action">
      <a-button v-if="current == 0 " type="primary" @click="handleBooking()">
        Next
      </a-button>
      <a-button
        v-if="current == 1 "
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Submit
      </a-button>
      <a-button
        v-if="current == 3 "
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>
<script>
import SeatList from "../../components/SeatList";
export default {
  props: ["bookTrip"],
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "Chọn chỗ",
        },
        {
          title: "Nhập thông tin",
        },
        {
          title: "Last",
        },
      ],
      totalPrice: this.bookTrip.price,
      bookTiketForm: {
        email: "",
        fullName: "",
        phomeNumber: "",
      },
      ticket: {
          tripId: this.bookTrip._id,
          seats: []
      },
      rules: {
        email: [
          {
            required: true,
            type: "email",
            message: "Vui lòng nhập email",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          { required: true, message: "Vui lòng nhập số điện thoại", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "Vui lòng nhập họ tên", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      handleBooking2(list){

      this.bookTiketForm.seats = list;
      },
    handleBooking() {
      this.$store.dispatch("actFetchBookTicket", this.bookTiketForm)
    },
    prev() {
      this.current--;
    },
  },
  components: {
    SeatList,
  },
  computed: {
    data() {
      let arr = [];
      arr.push(this.bookTrip);
      return arr;
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  margin-bottom: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.steps-action {
  margin-top: 24px;
}
</style>
