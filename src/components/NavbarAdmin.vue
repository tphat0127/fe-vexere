<template>
    <div type="flex" justify="space-around" align="middle" class="header">
      <div class="logo" />
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/admin/dashboard">Dashboard</router-link>
        </a-menu-item>
        <a-menu-item key="2">
           <router-link to="/admin/stations">Station</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a @click="handleLogout">Logout</a>
        </a-menu-item>
      </a-menu>
      <Login/>
    </div>
</template>
<script>
import Login from "./Login";
export default {
  data() {
    return {
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("actLogout");
    }
  },
  components: {
    Login
  }
};
</script>