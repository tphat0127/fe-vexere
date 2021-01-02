<template>
  <a-menu theme="light" mode="inline">
    <a-menu-item key="7">
      <router-link to="/admin/dashboard">
        <DashboardOutlined /> <span>Dashboard</span></router-link
      >
    </a-menu-item>
    <a-menu-item key="1">
      <router-link to="/admin/coaches">
        <RocketOutlined /> <span>Coach Manage</span></router-link
      >
    </a-menu-item>
    <a-menu-item key="2">
      <router-link to="/admin/stations">
        <BankOutlined /> <span>Station Manage</span></router-link
      >
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/admin/trips">
        <EnvironmentOutlined /> <span>Trip Manage </span></router-link
      >
    </a-menu-item>

    <a-menu-item key="4">
      <router-link to="/admin/users">
        <UserSwitchOutlined /> <span>User Manage</span></router-link
      >
    </a-menu-item>
    <a-menu-item key="5">
      <router-link to="/admin/tickets">
        <DollarCircleOutlined /> <span>Ticket Manage</span></router-link
      >
    </a-menu-item>
    <a-menu-item key="6">
       <ExportOutlined /> <span><a @click="handleLogout">Logout</a></span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import {
  RocketOutlined,
  DashboardOutlined,
  ExportOutlined,
  DollarCircleOutlined,
  UserSwitchOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    RocketOutlined,
    ExportOutlined,
    DollarCircleOutlined,
    UserSwitchOutlined,
    EnvironmentOutlined,
    BankOutlined,
    DashboardOutlined
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("actLogout");
    }
  }
};
</script>

<style></style>
