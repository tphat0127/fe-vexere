<template>
  <a-form
    ref="ruleEditStationForm"
    :model="editStationForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="Station name" name="name">
      <a-input v-model:value="editStationForm.name" />
    </a-form-item>
    <a-form-item ref="province" label="Provice" name="province">
      <a-input v-model:value="editStationForm.province" />
    </a-form-item>
    <a-form-item ref="address" label="Address" name="address">
      <a-input v-model:value="editStationForm.address" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
    <a-button type="primary" @click="onSubmit">
      Edit
    </a-button>
    <a-button style="margin-left: 10px;" @click="resetForm">
      Reset
    </a-button>
  </a-form-item>
  </a-form>
</template>
<script>
import * as types from "./../../../store/modules/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_DETAIL_STATION, this.$route.params.stationId);
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      editStationForm: {
        name: "",
        province: "",
        address: "",
      },
      rules: {
        name: [{ required: true, message: 'Please input station name', trigger: 'blur' }],
        province: [{ required: true, message: 'Please input province', trigger: 'blur' }],
        address: [{ required: true, message: 'Please input address', trigger: 'blur' }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleEditStationForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchEditStation", { _id: this.$route.params.stationId, station: this.editStationForm});
        })
        .catch(error => {
          console.log('error', error);
        });
    },
    resetForm() {
      this.$refs.ruleEditStationForm.resetFields();
    },
  },
  computed: {
    stationDetail() {
      return this.$store.state.modules.data;
    },
  },
  // watch: {
  //   stationDetail(a) {
  //     this.editStationForm = a;
  //   },
  // },
};
</script>
