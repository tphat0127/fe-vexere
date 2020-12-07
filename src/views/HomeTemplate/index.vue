<template>
  <a-layout> 
      <div type="flex" justify="space-around" align="middle">
        <NavbarHome />
      </div>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
      <a-layout-footer >Footer</a-layout-footer>
  </a-layout>
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
