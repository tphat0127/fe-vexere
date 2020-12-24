<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col v-for="(trip, index) in data" :key="index">
      <template v-for="(seat, index) in trip.seats" :key="index">
        <Seat
          :seat="seat"
          @event-book="handleBooking"
          :unSeatSelect="unSeatSelect"
        />
        <br v-if="(index + 1) % 4 === 0" />
      </template>
    </a-col>
  </a-row>
  <a-row type="flex" justify="end" align="middle">
    <a-col>
      Ghế:
      <template v-for="(seat, index) in listSeatSelect" :key="index">
        <a-tag closable @close="handleCancle(index, seat)">
          {{ seat.code }}
        </a-tag>
      </template>
    </a-col>
  </a-row>
  <a-row type="flex" justify="end" align="middle">
    <a-col>
      <h3>Tổng cộng: {{ totalPrice }}đ</h3>
    </a-col>
  </a-row>
</template>

<script>
import Seat from "./seat";
export default {
  props: ["trip_seats", "price"],
  components: {
    Seat,
  },
  data() {
    return {
      data: this.trip_seats,
      listSeatSelect: [],
      unSeatSelect: null,
      totalPrice: 0,
    };
  },
  methods: {
    handleBooking(obj) {
      this.$emit('send-listseat', this.listSeatSelect);
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
};
</script>

<style></style>
