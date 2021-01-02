<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
      <div class="logo">Vexere</div>
      <MenuAdmin />
    </a-layout-sider>
    <a-layout>
      <a-layout-header theme="light" class="header">
        <div class="header-menu">
          <a @click="handleLogout">Logout</a>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Admin</a-breadcrumb-item>
          <a-breadcrumb-item>...</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        @ 2020 Nguyễn Tấn Phát
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import MenuAdmin from "./../../components/MenuAdmin";
export default {
  components: {
    MenuAdmin,
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ["1"],
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("actLogout");
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  font-family: "Pacifico", cursive;
  font-weight: 400;
  text-transform: lowercase;
  font-size: 1.5rem;
}
.header {
  background: #fff;
  width: 100%;
  z-index: 0;
  position: relative;
  top: 0;
}
.header-menu {
  float: right;
}
.logo {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  text-transform: lowercase;
  font-size: 1.5rem;
}
</style>
