<template>
  <a-form
    ref="ruleStationForm"
    :model="bookTiketForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="email" label="Email" name="email">
      <a-input v-model:value="bookTiketForm.email" />
    </a-form-item>
    <a-form-item ref="fullName" label="Họ tên" name="fullName">
      <a-input v-model:value="bookTiketForm.fullName" />
    </a-form-item>
    <a-form-item ref="phoneNumber" label="Số điện thoại" name="phoneNumber">
      <a-input v-model:value="bookTiketForm.phoneNumber" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      bookTiketForm: {
        email: "",
        fullName: "",
        phomeNumber: "",
      },
      rules: {
        email: [
          {
            required: true,
            type: "email",
            message: "Vui lòng nhập email",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "Vui lòng nhập số điện thoại",
            trigger: "blur",
          },
        ],
        fullName: [
          { required: true, message: "Vui lòng nhập họ tên", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style></style>
