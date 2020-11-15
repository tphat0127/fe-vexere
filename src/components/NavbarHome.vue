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
          <router-link to="/">Trang chủ</router-link>
        </a-menu-item>
        <a-menu-item key="2">
           <router-link to="/stations">Bến xe</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/about">Liên hệ</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <UserOutlined />Đăng nhập
        </a-menu-item>
      </a-menu>
    </div>
</template>
<script>
import {UserOutlined} from "@ant-design/icons-vue";
export default {
  data() {
    return {
    };
  },
  components: {
    UserOutlined,
  }
};
</script>