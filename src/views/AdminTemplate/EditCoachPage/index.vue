<template>
  <template v-if="$store.state.coach.loading"><Loader /></template>
  <template v-else>
    <h2>Update Coach</h2>
    <a-form
      ref="ruleCoachForm"
      :model="editCoachForm"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
    >
      <!-- Thumbnail -->
      <a-form-item ref="thumbnail" label="Thumbnail" name="thumbnail">
        <a-space size="large">
          <a-avatar
            shape="square"
            :size="64"
            :src="`${imgUrl}${editCoachForm.thumbnail}`"
          />
          <a-upload
            accept="image/*"
            list-type="picture"
            v-model:fileList="fileList"
            @change="onChangeThumbnail"
            :customRequest="dummyRequest"
          >
            <a-button> Upload </a-button>
          </a-upload>
        </a-space>
      </a-form-item>

      <!-- Seats-->
      <!-- Name -->
      <a-form-item ref="name" label="Coach name" name="name">
        <a-input v-model:value="editCoachForm.name" />
      </a-form-item>
      <!-- Seats-->
      <a-form-item ref="seats" label="Coach seats" name="seats">
        <a-input-number v-model:value="editCoachForm.seats" />
      </a-form-item>

      <!-- Submit -->
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="onSubmit"
          :loading="$store.state.coach.loading"
        >
          Edit
        </a-button>
      </a-form-item>
    </a-form>
  </template>
</template>
<script>
import * as types from "./../../../store/coach/constant";
import Loader from "./../../../components/Loader";
import { imgServer } from "./../../../api";
import { message } from "ant-design-vue";
export default {
  created() {
    this.$store.dispatch(
      types.A_FETCH_DETAIL_COACH,
      this.$route.params.coachId
    );
  },
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
      fileList: [],
      imgUrl: imgServer,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      editCoachForm: {
        seats: 24,
        _id: "",
        thumbnail: "",
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
      this.$refs.ruleCoachForm
        .validate()
        .then(() => {
          this.$store.dispatch("actFetchEditCoaches", this.editCoachForm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    dummyRequest({ info, onSuccess }) {
      setTimeout(() => {
        onSuccess("ok");
        console.log("duumy", info);
      }, 0);
    },
    onChangeThumbnail(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`Đã thay đổi avatar`);
        let file = info.fileList[0].originFileObj;
        const formData = new FormData();
        const config = { headers: { "content-type": "multipart/form-data" } };

        formData.append("thumbnail", file);
        this.$store.dispatch("actUpdateThumbnail", {
          formData: formData,
          id: this.editCoachForm._id,
        });
        console.log(config);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
  computed: {
    coachDetail() {
      return this.$store.state.coach.data;
    },
    loading() {
      return this.$store.state.coach.loading;
    },
  },
  watch: {
    coachDetail() {
      this.editCoachForm = this.coachDetail;
    },
  },
  components: {
    Loader,
  },
};
</script>
