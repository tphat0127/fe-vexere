<template>
  <router-view />
</template>
<script>
  export default {
    created() {
      this.$store.dispatch("actTryLogin");
    }
  }
</script>
<style>

</style>
