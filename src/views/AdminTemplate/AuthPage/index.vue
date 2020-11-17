<template>
  <div class="form">
    <div class="logo"><img alt="logo" src="/favicon.ico"><span>Login Admin</span></div>
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
    <router-link to="/"> ← Back to Home Page </router-link>
  </div>
</template>

<script>
import * as types from "./../../../store/auth/constant";
export default {
  components: {
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

<style>
  body {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .form{
    position: absolute;
    top: 45%;
    left: 50%;
    margin: -160px 0 0 -160px;
    width: 320px;
    height: 320px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0,0,0,.08);
  }
  .logo{
    text-align: center;
    cursor: pointer;
    margin-bottom: 24px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .logo span {
    vertical-align: text-bottom;
    font-size: 16px;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 700;
    color: #1890ff;
    background-image: -webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>