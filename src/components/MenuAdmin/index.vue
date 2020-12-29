<template>
  <a-menu theme="light" mode="inline">
    <a-menu-item key="1">
      <router-link to="/admin/stations">
        <PieChartOutlined /> <span>Station </span></router-link
      >
    </a-menu-item>
    <a-menu-item key="2">
      <router-link to="/admin/trips">
        <PieChartOutlined /> <span>Trip </span></router-link
      >
    </a-menu-item>
    <a-menu-item key="4">
      <router-link to="/admin/coaches">
        <PieChartOutlined /> <span>Coach </span></router-link
      >
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/about"> <FileOutlined />Liên hệ</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { PieChartOutlined, FileOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    PieChartOutlined,
    FileOutlined
  }
};
</script>

<style></style>
