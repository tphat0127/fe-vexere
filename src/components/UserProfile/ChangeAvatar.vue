<template>
  <template v-if="this.$store.state.user.loading"><Loader /> </template>
  <template v-else>
    <p>
      <a-avatar :src="`${imgUrl}${userProfile.avatarUrl}`" />
      {{ userProfile.fullName }}
    </p>

    <a-upload
      accept="image/*"
      list-type="picture"
      v-model:fileList="fileList"
      @change="onChangeAvatar"
      :customRequest="dummyRequest"
      
    >
      <a-button 
        :disabled="disabled"> Upload </a-button>
    </a-upload>
  </template>
</template>

<script>
import * as types from "./../../store/user/constant";
import Loader from "./../Loader";
import { imgServer } from "./../../api";
import { message } from "ant-design-vue";
export default {
  props: ["userProfile"],
  created() {
    this.$store.dispatch(types.A_FETCH_ME);
  },
  updated() {
      this.fileList.length > 0? this.disabled = true: this.disabled = false
  },
  data() {
    return {
      fileList: [],
      imgUrl: imgServer,
      disabled: false
    };
  },
  methods: {
    dummyRequest({ info, onSuccess }) {
      setTimeout(() => {
        onSuccess("ok");
        console.log("duumy", info);
      }, 0);
    },
    onChangeAvatar(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`Đã thay đổi avatar`);
        let file = info.fileList[0].originFileObj;
        const formData = new FormData();
        const config = { headers: { "content-type": "multipart/form-data" } };

        formData.append("avatar", file);
        this.$store.dispatch("actUpdateAvatar", formData);
        console.log(config);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
  components: {
      Loader
  }
};
</script>

<style></style>
