<template>
  <a-form
    ref="ruleTripForm"
    :model="createUserForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <!-- Email -->
    <a-form-item ref="email" label="Email" name="email">
      <a-input v-model:value="createUserForm.email" />
    </a-form-item>
    <!-- Name -->
    <a-form-item ref="fullName" label="Họ tên" name="fullName">
      <a-input v-model:value="createUserForm.fullName" />
    </a-form-item>
    <!-- Password -->
    <a-form-item ref="password" label="Mật khẩu" name="password">
      <a-input type="password" v-model:value="createUserForm.password" />
    </a-form-item>
     <!-- Confirm Password -->
    <a-form-item ref="confirmPassword" label="Mật khẩu" name="confirmPassword">
      <a-input type="password" v-model:value="createUserForm.confirmPassword" />
    </a-form-item>
    <!-- User type-->
    <a-form-item ref="userType" label="User type " name="userType">
      <a-select v-model:value="createUserForm.userType">
        <a-select-option value="Admin">Admin</a-select-option>
        <a-select-option value="Member">Member</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Submit -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :loading="$store.state.coach.loading"
      >
        Tạo
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  data() {
    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Nhập lại mật khẩu");
      } else if (value !== this.createUserForm.password) {
        return Promise.reject("Mật khẩu không khớp!");
      } else {
        return Promise.resolve();
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      createUserForm: {
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        userType: "Member",
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
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleTripForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchCreateUser", this.createUserForm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  },
};
</script>
