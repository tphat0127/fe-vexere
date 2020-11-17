<template>
  <NavbarAdmin />
  <div style="margin-bottom: 2em"></div>
  <router-view />
</template>

<script>
import NavbarAdmin from "./../../components/NavbarAdmin";
export default {
  components: {
    NavbarAdmin
  }
};
</script>

<style></style>
