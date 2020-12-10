<template>
  <div class="container">
    <template v-for="(trip, index) in data" :key="index">
      <template v-for="(seat, index) in trip.seats" :key="index">
        <Seat
            :seat="seat"
            @event-book="handleBooking"
            :unSeatSelect="unSeatSelect"
          />
          <br v-if="(index + 1) % 4 === 0" />
      </template>
    </template>
    <!-- <h3>Booking Bus</h3>
    <div class="row">
      <div class="col-sm-6">
        <template v-for="(seat, index) in listSeat.seats" :key="index">
          <Seat
            :seat="seat"
            @event-book="handleBooking"
            :unSeatSelect="unSeatSelect"
          />
          <br v-if="(index + 1) % 4 === 0" />
        </template>
      </div>
      <div class="col-sm-6">
        <h3>Danh sach ghe dang chon</h3>
        <p v-for="(seat, index) in listSeatSelect" :key="index">
          Ghế: {{ seat.SoGhe }} ${{ seat.Gia }}
          <span style="color: red" @click="handleCancle(index, seat)"
            >[Cancle]</span
          >
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
import Seat from "./seat";
export default {
  props: ["trip_seats"],
  components: {
    Seat,
  },
  created() {
    console.log(this.listSeat.seats);
  },
  data() {
    return {
      data: this.trip_seats,
      listSeat: [],
      //   listSeatSelect: [],
      //   unSeatSelect: null,
    };
  },
  //   methods: {
  //     handleBooking(obj) {
  //       if (obj.statusSeat) {
  //         this.listSeatSelect.push(obj.seat);
  //         this.unSeatSelect = null;
  //       } else {
  //         const index = this.listSeatSelect.findIndex((item) => {
  //           return item.SoGhe === obj.seat.SoGhe;
  //         });
  //         if (index !== -1) {
  //           this.listSeatSelect.splice(index, 1);
  //         }
  //       }
  //     },
  //     handleCancle(index, seat) {
  //       this.unSeatSelect = seat;
  //       this.listSeatSelect.splice(index, 1);
  //     },
  //   },
};
</script>

<style></style>
