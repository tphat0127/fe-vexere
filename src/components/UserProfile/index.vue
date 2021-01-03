<template>
  <template v-if="$store.state.user.loading"><Loading /></template>
  <template v-else>
    <p>
      <a-avatar :src="`${imgUrl}${userProfile.avatarUrl}`" />
      {{ userProfile.fullName }}
    </p>
    <p><MailOutlined /> {{ userProfile.email }}</p>
    <a-divider />

    <a-button type="link" @click="model_updatePassword = true">
      <KeyOutlined /> Đổi mật khẩu
    </a-button>
    <a-divider />
    <a-button type="link" @click="model_changeAvatar = true"> <UserOutlined /> Đổi Avatar </a-button>
    <a-divider />

    <a-button type="link" @click="handleLogOut">
      <ExportOutlined /> Đăng xuất
    </a-button>
  </template>
  <a-modal
    v-model:visible="model_updatePassword"
    title="Đổi mật khẩu"
    :footer="null"
  >
    <UpdatePassword :userProfile="userProfile" />
  </a-modal>
  <a-modal
    v-model:visible="model_changeAvatar"
    title="Đổi Avatar"
    :footer="null"
  >
    <ChangeAvatar :userProfile="userProfile" />
  </a-modal>
</template>
<script>
import UpdatePassword from "./../UserProfile/UpdateUserPassword";
import ChangeAvatar from "./ChangeAvatar";
import Loading from "./../Loader"
import { imgServer } from "./../../api";
import * as types from "./../../store/user/constant";
//import jwtDecode from "jwt-decode";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  MailOutlined,
  KeyOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_ME);
  },
  components: {
    UserOutlined,
    MailOutlined,
    KeyOutlined,
    ExportOutlined,
    UpdatePassword,
    ChangeAvatar,
    Loading
  },
  data() {
    return {
      model_updatePassword: false,
      model_changeAvatar: false,
      imgUrl: imgServer,
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
      // const token = localStorage.getItem("token");
      // const user = jwtDecode(token);
      // return user;
      return this.$store.state.user.userData;
    },
  },
};
</script>
