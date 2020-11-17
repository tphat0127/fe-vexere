<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="['1']"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="1">
      <router-link to="/">Trang chủ</router-link>
    </a-menu-item>
    <a-menu-item key="2">
        <router-link to="/stations">Bến xe</router-link>
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/about">Liên hệ</router-link>
    </a-menu-item>
    <a-menu-item key="4" @click="showModal">
      <UserOutlined />Đăng nhập
    </a-menu-item>
  </a-menu>
  <Login/>
</template>
<script>
import {UserOutlined} from "@ant-design/icons-vue";
import Login from "./Login";
export default {
  data() {
    return {
    };
  },
  methods: {
    showModal() {
      this.$store.dispatch("actHandleLogin");
    }
  },
  components: {
    UserOutlined,
    Login
  }
};
</script>