<template>
  <template v-if="$store.state.user.loading"><Loader /></template>
  <a-form
    v-else
    ref="ruleuserForm"
    :model="editUserForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <!-- Name -->
    <a-form-item ref="fullName" label="Họ tên" name="fullName">
      <a-input v-model:value="editUserForm.fullName" />
    </a-form-item>
    <!-- Email-->
    <a-form-item ref="email" label="Email " name="email">
      <a-input v-model:value="editUserForm.email" />
    </a-form-item>
<!-- Usertype-->
    <a-form-item ref="userType" label="User type " name="userType">
      <a-select v-model:value="editUserForm.userType">
          <a-select-option value="Admin">Admin</a-select-option>
          <a-select-option value="Member">Member</a-select-option>
      </a-select>
    </a-form-item>
    <!-- Submit -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :loading="$store.state.user.loading"
      >
        Edit
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import * as types from "./../../../store/user/constant";
import Loader from "./../../../components/Loader";
export default {
  created() {
    this.$store.dispatch(
      types.A_FETCH_DETAIL_USER,
      this.$route.params.userId
    );
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      editUserForm: {
        fullName: "",
        email: "",
        userType: "",
      },
      rules: {
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleuserForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchEditUser", this.editUserForm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  },
  computed: {
    userDetail() {
      return this.$store.state.user.data;
    },
    loading() {
      return this.$store.state.user.loading;
    },
  },
  watch: {
    userDetail() {
      this.editUserForm = this.userDetail;
    },
  },
  components: {
    Loader,
  },
};
</script>
