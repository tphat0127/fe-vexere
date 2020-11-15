<template>
  <template v-if="loading">
    <Loader />
  </template>
  <a-row type="flex" justify="space-around" align="middle" v-else>
    <a-descriptions bordered>
      <template #title>
        <EnvironmentOutlined :style="{ fontSize: '1.5em', color: '#08c' }" />
        {{ data.name }}
      </template>
      <a-descriptions-item label="Địa chỉ">
        {{ data.address }}
      </a-descriptions-item>
      <a-descriptions-item label="Tỉnh thành">
        {{ data.province }}
      </a-descriptions-item>
    </a-descriptions>
  </a-row>
</template>

<script>
import Loader from "./../../../components/Loader";
import { EnvironmentOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    Loader,
    EnvironmentOutlined
  },
  created() {
    const id = this.$route.params.stationId;
    this.$store.dispatch("fetchDetailStation", id);
  },
  computed: {
    loading() {
      return this.$store.state.station.loading;
    },
    data() {
      return this.$store.state.station.data;
    }
  }
};
</script>
<style></style>
