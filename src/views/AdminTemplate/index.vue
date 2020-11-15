<template>
  <NavbarHome />
  <div style="margin-bottom: 2em"></div>
  <router-view />
</template>

<script>
import NavbarHome from "./../../components/NavbarHome";
export default {
  components: {
    NavbarHome
  }
};
</script>

<style></style>
