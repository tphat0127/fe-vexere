<template>
  <header class="header home-page-wrapper" style="opacity: 1;">
    <div class="home-page">
      <div class="header-logo" style="transform: translate(0px, 0px);">
        LOGO HERE
      </div>
      <div class="header-menu">
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
          <a-menu-item key="4" @click="click">
            <UserOutlined /> <span v-if="!isLoggedIn">Đăng nhập</span> <span v-else>Logout</span>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </header>
  <a-modal v-model:visible="modal_visible" title="Đăng nhập" :footer="null" v-if="!isLoggedIn">
   <Login />
  </a-modal>
</template>
<script>
import { UserOutlined } from "@ant-design/icons-vue";
import Login from "./Login";
import { message } from 'ant-design-vue';
export default {
  data() {
    return {
      modal_visible: false,
    }
  },
  methods: {
    click() {
      if(!this.isLoggedIn){
        this.showModal();
      }
      else {
        this.handleLogOut();
      }
    },
    showModal() {
      this.$store.dispatch("actHandleLogin")
      this.modal_visible = true;
    },
    handleLogOut() {
      this.$store.dispatch("actUserLogout")
      message.success('Đã đăng xuất');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    }
  },
  components: {
    UserOutlined,
    Login,
  },
};
</script>
<style>
.header {
  background: #fff;
  width: 100%;
  z-index: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
}
.home-page-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.home-page-wrapper .home-page {
  height: 100%;
  max-width: 1200px;
  position: relative;
  margin: auto;
  will-change: transform;
}
.header-logo {
  display: inline-block;
  position: relative;
  width: 150px;
  line-height: 64px;
}
.header-logo img {
  vertical-align: middle;
  display: inline-block;
}
.header-menu {
  float: right;
}
</style>
