<template>
  <div style="width: 100%;">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-if="current == 0">
        <template v-for="(seat, index) in bookTrip.seats" :key="index">
          <Seat
            :seat="seat"
            @event-book="handleBooking"
            :unSeatSelect="unSeatSelect"
          />
          <br v-if="(index + 1) % 4 === 0" />
        </template>
      </div>
      <div v-else-if="current == 1">
        <div v-if="isLoggedIn">
          <a-divider>Thanh toán</a-divider>
          ĐÃ THANH TOÁN
        </div>
        <div v-else>
           <a-divider>Bạn cần đăng nhập để tiếp tục</a-divider>
          <Login />
        </div>
      </div>
      <div v-else>
        <h3>Đặt vé thành công</h3>
      </div>
    </div>
    <a-row class="steps-action" type="flex" justify="space-between">
      <a-col>
        <a-button v-if="current == 0" type="primary" @click="handleNextStep()">
          Tiếp tục
        </a-button>
        <a-button
          v-if="current == 1"
          type="primary"
          @click="handleBookTicket()"

          :disabled="!isLoggedIn"
          :loading="$store.state.ticket.loading"
        >
          Đặt vé
        </a-button>
        <a-button
          v-if="current == 2"
          type="primary"
          @click="this.router.to('/')"
        >
          Trang chủ
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          Quay lại
        </a-button>
      </a-col>
      <a-col>
        <template v-for="(seat, index) in listSeatSelect" :key="index">
          <a-tag closable @close="handleCancle(index, seat)">
            {{ seat.code }}
          </a-tag>
        </template>

        <b>Tổng cộng: {{ totalPrice }}đ</b>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Modal } from "ant-design-vue";
import { h } from "vue";
import Seat from "../../components/SeatList/seat";
import Login from "../../components/Login";
export default {
  props: ["bookTrip"],
  data() {
    return {
      listSeatSelect: [],
      unSeatSelect: null,
      totalPrice: 0,
      price: this.bookTrip.price,
      current: 0,
      steps: [
        {
          title: "Chọn chỗ",
        },
        {
          title: "Nhập thông tin",
        },
        {
          title: "Thành công",
        },
      ],
    };
  },
  methods: {
    handleNextStep() {
      if(this.listSeatSelect.length === 0) {
        Modal.info({
        title: 'Bạn chưa chọn chỗ',
        content: h('div', {}, [
          h('p', 'Cần chọn ít nhất 1 ghế trống'),
        ]),
        onOk() {},
      });
      return;
      }
      this.current = 1;
    },
    handleBookTicket() {
      let code = this.listSeatSelect.map((seat) => seat.code);
      this.$store.dispatch("actFetchBookTicket", {
        tripId: this.bookTrip._id,
        seatCodes: code,
      });
      this.current = 2;
    },
    prev() {
      this.current--;
    },
    handleBooking(obj) {
      this.$emit("send-listseat", this.listSeatSelect);
      if (obj.statusSeat) this.totalPrice += this.price;
      else this.totalPrice -= this.price;
      if (obj.statusSeat) {
        this.listSeatSelect.push(obj.seat);
        
        this.unSeatSelect = null;
      } else {
        const index = this.listSeatSelect.findIndex((item) => {
          return item.code === obj.seat.code;
        });
        if (index !== -1) {
          this.listSeatSelect.splice(index, 1);
        }
      }
    },
    handleCancle(index, seat) {
      this.totalPrice -= this.price;
      this.unSeatSelect = seat;
      this.listSeatSelect.splice(index, 1);
    },
  },
  components: {
    Seat,
    Login,
  },
  computed: {
    data() {
      let arr = [];
      arr.push(this.bookTrip);
      return arr;
    },
    isLoggedIn() {
      if (localStorage.getItem("token")) return true;
      return false;
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
