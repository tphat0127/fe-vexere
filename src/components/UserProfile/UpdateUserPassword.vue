<template>
  <a-row type="flex" justify="center" align="middle"
    > 
    <a-form layout="vertical" ref="ruleForm" :model="formInline" :rules="rules">
      <a-form-item>
      <a-alert
          v-if="error"
          type="error"
          :message="error.response.data.message"
          banner
      />
      <a-alert v-else-if="data" :message="data.message" type="success" />
      </a-form-item>
      <a-form-item name="oldPassword">
        <a-input
          v-model:value="formInline.oldPassword"
          type="password"
          placeholder="Mật khẩu cũ"
        />
      </a-form-item>
      <a-form-item name="newPassword">
        <a-input
          v-model:value="formInline.newPassword"
          type="password"
          placeholder="Mật khẩu mới"
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
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          @click="handleSubmit"
        >
          Đổi mật khẩu
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
//import * as types from "./../../store/user/constant";
export default {
  props: ["userProfile"],
  data() {
    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Nhập lại mật khẩu");
      } else if (value !== this.formInline.newPassword) {
        return Promise.reject("Mật khẩu không khớp!");
      } else {
        return Promise.resolve();
      }
    };
    return {
      formInline: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "Chưa nhập mật khẩu cũ", trigger: "blur" },
        ],
        newPassword: [
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
          this.$store.dispatch("actUpdatePassword", {
            email: this.userProfile.email,
            oldPassword: this.formInline.oldPassword,
            newPassword: this.formInline.newPassword
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  },
  computed: {
    loading() {
      return this.$store.state.user.loading;
    },
    error() {
      return this.$store.state.user.error;
    },
    data() {
      return this.$store.state.user.data;
    }
  },
  components: {},
};
</script>

<style></style>
