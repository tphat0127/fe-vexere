<template>
  <a-row type="flex" justify="center" align="middle">
    <a-alert v-if="error" type="error" :message="error.response.data.message" banner />
    <a-form layout="vertical" @submit.prevent="handleSubmit">
      <a-form-item>
          <a-input v-model:value="formInline.email" placeholder="Username" />
      </a-form-item>
      <a-form-item>
          <a-input v-model:value="formInline.password" type="password" placeholder="Password" />
      </a-form-item>
      <a-form-item>
          <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
          :loading="loading"
          >
          Log in
          </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
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
  }
};
</script>

<style></style>
