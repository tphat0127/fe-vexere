<template>
  <a-row type="flex" justify="center" align="middle">
    <a-form
      layout="vertical"
      ref="ruleForm"
      :model="formInline"
      :rules="rules"
    >
      <a-form-item>
        <a-alert
        v-if="error"
        type="error"
        :message="error.response.data.email"
        banner
      /></a-form-item>
      <a-form-item ref="email" name="email">
        <a-input v-model:value="formInline.email" placeholder="Email" />
      </a-form-item>
      <a-form-item ref="fullName" name="fullName">
        <a-input v-model:value="formInline.fullName" placeholder="Họ tên" />
      </a-form-item>
      <a-form-item name="password">
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="Mật khẩu"
        />
      </a-form-item>
      <a-form-item name="confirmPassword">
        <a-input
          v-model:value="formInline.confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" @click="handleSubmit">
          Đăng ký
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
import * as types from "./../../store/user/constant";
export default {
  data() {
    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Nhập lại mật khẩu");
      } else if (value !== this.formInline.password) {
        return Promise.reject("Mật khẩu không khớp!");
      } else {
        return Promise.resolve();
      }
    };
    return {
      formInline: {
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
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
        fullName: [
          { required: true, message: "Chưa nhập họ tên", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Chưa nhập mật khẩu", trigger: "blur" },
        ],
        confirmPassword: [{ validator: validatePass2, trigger: "change" }],
      },
      loi: "hihi",
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$store.dispatch(types.A_FETCH_REGISTRATION, this.formInline);
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
  },
  components: {},
};
</script>

<style></style>
