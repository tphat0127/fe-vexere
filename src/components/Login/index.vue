<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col v-if="loading"><Loader /></a-col>
    <a-col v-else>
      <a-modal
        v-model:visible="this.$store.state.login.modal_visible"
        title="Đăng nhập"
      >
        <a-alert
          v-if="error"
          type="error"
          :message="error.response.data.message"
          banner
        />
        <a-form layout="inline" :model="formInline">
          <a-form-item>
            <a-input v-model:value="formInline.email" placeholder="Username">
              <template #prefix
                ><UserOutlined style="color:rgba(0,0,0,.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="formInline.password"
              type="password"
              placeholder="Password"
            >
              <template #prefix
                ><LockOutlined style="color:rgba(0,0,0,.25)"
              /></template>
            </a-input>
          </a-form-item>
        </a-form>
        <template #footer>
          <a-button
            type="primary"
            html-type="submit"
            @click.prevent="handleSubmit"
          >
            Log in
          </a-button>
        </template>
      </a-modal>
    </a-col>
  </a-row>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import Loader from "../Loader";
import * as types from "./../../store/login/constant";
export default {
  data() {
    return {
      formInline: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      const user = {
        email: this.formInline.email,
        password: this.formInline.password
      };
      this.$store.dispatch(types.A_LOGIN, user);
    }
  },
  computed: {
    loading() {
      return this.$store.state.login.loading;
    },
    error() {
      return this.$store.state.login.error;
    }
  },
  components: {
    UserOutlined,
    LockOutlined,
    Loader
  }
};
</script>

<style></style>
