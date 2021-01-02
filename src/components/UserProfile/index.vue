<template>
  <template v-if="$store.state.user.loading"></template>
  <template v-else>
    <p>
      <a-avatar size="large">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      {{ userProfile.fullName }}
    </p>
    <p><MailOutlined /> {{ userProfile.email }}</p>
    <a-divider />
    
    <a-button type="link" @click="model_updatePassword = true">
      <KeyOutlined /> Đổi mật khẩu
    </a-button>
    <a-divider/>
    <a-button type="link">
      <UserOutlined /> Đổi Avatar
    </a-button>
    <a-divider />
    
    <a-button type="link">
      <ProfileOutlined /> Cập nhật hồ sơ
    </a-button>
    <a-divider />
    
    <a-button type="link" @click="handleLogOut">
      <ExportOutlined /> Đăng xuất
    </a-button>
  </template>
  <a-modal v-model:visible="model_updatePassword" title="Đổi mật khẩu" :footer="null">
   <UpdatePassword :userProfile="userProfile"/>
  </a-modal>
</template>
<script>
import UpdatePassword from "./../UserProfile/UpdateUserPassword";

import jwtDecode from "jwt-decode";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  MailOutlined,
  KeyOutlined,
  ProfileOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
export default {
  updated(){

  },
  components: {
    UserOutlined,
    MailOutlined,
    KeyOutlined,
    ProfileOutlined,
    ExportOutlined,
    UpdatePassword
  },
  data() {
    return {
        model_updatePassword: false
    };
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch("actUserLogout");
      message.success("Đã đăng xuất");
    },
  },
  computed: {
    userProfile() {
       const token = localStorage.getItem("token");
        const user = jwtDecode(token)
      return user
    }
  },
};
</script>
