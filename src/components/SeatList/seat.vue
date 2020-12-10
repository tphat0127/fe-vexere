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

<style scoped>
.seat {
  background-color: gray;
  color: white;
  width: 44px;
  margin: 5px;
}

.seatSelect {
  background-color: green;
}

.seatBooked {
  background-color: red;
  cursor: no-drop;
}
</style>