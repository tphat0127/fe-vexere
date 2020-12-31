<template>
  <a-row type="flex" justify="center" align="middle">
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item>
        <a-alert
          v-if="error"
          type="error"
          :message="error.response.data.message"
          banner
        />
      </a-form-item>
      <a-form-item ref="email" label="Email" name="email">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item ref="password" label="Mật khẩu" name="password">
        <a-input v-model:value="form.password" type="password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          @click="onSubmit"
          type="primary"
          html-type="submit"
          :loading="loading"
        >
          Login
        </a-button>

        <a-button type="link" @click="showModal">
          Đăng ký
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
  <a-modal
    v-model:visible="modal_visible"
    title="Đăng ký"
    :footer="null"
    v-if="!isLoggedIn"
  >
    <Register />
  </a-modal>
</template>
<script>
import * as types from "./../../store/user/constant";
import Register from "./../Register";
export default {
  data() {
    return {
      modal_visible: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "Chưa nhập email", trigger: "blur" },
          {
            required: true,
            message: "Email không hợp lệ ",
            trigger: "blur",
            type: "email",
          },
        ],
        password: {
          required: true,
          message: "Chưa nhập mật khẩu",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    showModal() {
      this.modal_visible = true;
    },
    onSubmit() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$store.dispatch(types.A_LOGIN, this.form);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  computed: {
    loading() {
      return this.$store.state.user.loading;
    },
    error() {
      return this.$store.state.user.error;
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
  },
  components: {
    Register,
  },
};
</script>
