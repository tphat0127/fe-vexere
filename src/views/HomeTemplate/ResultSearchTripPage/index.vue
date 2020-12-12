<template>
    <SearchTrip />
  <div>{{ result }}</div>
</template>

<script>
import SearchTrip from "./../../../components/SearchTrip";
export default {
    components: {
        SearchTrip
    },
  computed: {
    result() {
      console.log(this.$store.state.trip.data);
      return this.$store.state.trip.data;
    },
  },
};
</script>

<style></style>
