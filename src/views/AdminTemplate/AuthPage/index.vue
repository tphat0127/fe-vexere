<template>
  <a-row type="flex" justify="center" align="middle">
  <a-col v-if="loading"><Loader /></a-col>
  <a-col v-else>
    <h2 align="center">Login</h2>
    <a-alert v-if="error" type="error" :message="error.response.data.message" banner />
    <a-form layout="horizontal" :model="formInline" @submit.prevent="handleSubmit">
        <a-form-item>
            <a-input v-model:value="formInline.email" placeholder="Username">
            <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-model:value="formInline.password" type="password" placeholder="Password">
            <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.user === '' || formInline.password === ''"
            >
            Log in
            </a-button>
        </a-form-item>
      </a-form>
  </a-col>
  </a-row>
</template>
<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import Loader from "./../../../components/Loader";
import * as types from "./../../../store/auth/constant";
export default {
  components: {
    UserOutlined,
    LockOutlined,
    Loader
  },
  data() {
    return {
      formInline: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      const user = {
          email: this.formInline.email,
          password: this.formInline.password,
      };
      this.$store.dispatch(types.A_LOGIN, user);
    },
  },
  computed: {
      loading() {
          return this.$store.state.auth.loading;
      },
      error() {
          return this.$store.state.auth.error;
      }
  }
};
</script>
