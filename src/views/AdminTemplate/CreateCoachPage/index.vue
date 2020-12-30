<template>

  <a-form
    ref="ruleTripForm"
    :model="createCoachForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <!-- Name -->
    <a-form-item ref="name" label="Tên xe" name="name">
      <a-input v-model:value="createCoachForm.name" />
    </a-form-item>
    <!-- Seats-->
    <a-form-item ref="seats" label="Số ghế " name="seats">
      <a-input-number v-model:value="createCoachForm.seats" />
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
      <a-button style="margin-left: 10px;" @click="resetForm">
        Nhập lại
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  data() {
    let checkSeats = async (rule, value) => {
      if (!value) {
        return Promise.reject("Chưa nhập số ghế");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Số ghế không hợp lệ");
      } else {
        if (value < 0) {
          return Promise.reject("Số ghế phải lớn hơn 0");
        } else {
          return Promise.resolve();
        }
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      createCoachForm: {
        name: "",
        seats: 24,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Chưa nhập tên xe",
          },
        ],
        seats: [{ validator: checkSeats, trigger: "change" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleTripForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchCreateCoach", this.createCoachForm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    resetForm() {
      this.$refs.ruleTripForm.resetFields();
    },
  },
};
</script>
