<template>
    <a-row type="flex" justify="center" class="header">
      <div class="logo" />
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          Trang chủ
        </a-menu-item>
        <a-menu-item key="2">
          Station
        </a-menu-item>
        <a-menu-item key="3">
          Liên hệ
        </a-menu-item>
        <a-menu-item key="4">
          <UserOutlined />Đăng nhập
        </a-menu-item>
      </a-menu>
    </a-row>
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