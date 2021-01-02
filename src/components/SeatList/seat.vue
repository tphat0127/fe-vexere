<template>
  <button
    class="btn seat"
    :class="{ seatSelect: statusSeat, seatBooked: seat.isBooked }"
    :disabled="seat.isBooked"
    @click="handleSelectSeat"
  >
    {{ seat.code }}
  </button>
</template>

<script>
export default {
  props: ["seat", "unSeatSelect"],
  data() {
    return {
      statusSeat: false,
    };
  },
  methods: {
    handleSelectSeat() {
      this.statusSeat = !this.statusSeat;
      const obj = {
        statusSeat: this.statusSeat,
        seat: this.seat,
      };
      this.$emit("event-book", obj);
      console.log(obj)
    },
  },

  watch: {
    unSeatSelect() {
      if (this.unSeatSelect) {
        if (this.unSeatSelect.code === this.seat.code) {
          this.statusSeat = false;
        }
      }
    },
  },
};
</script>

<style>
.seat {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  width: 3em;
  height: 3em;
  border: 1px solid #0e960a;
  margin-left: 0.2em;
  margin-bottom: 0.2em;
}
.seatSelect {
  background-color: #0e960a;
  color: white;
}

.seatBooked {
  background-color: red;
  border: 1px solid red;
  color: white;
  cursor: no-drop;
}
</style>