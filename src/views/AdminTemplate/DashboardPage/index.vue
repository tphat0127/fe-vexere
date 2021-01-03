<template>
  <a-result title="Wellcome to the Dashboard page!">
    <template #icon>
      <SmileOutlined />
    </template>
    <template #extra>
        <a href="/"><a-button type="primary">View website</a-button></a>
    </template>
  </a-result>
</template>

<script>
import { SmileOutlined } from "@ant-design/icons-vue";
export default {
    components: {
        SmileOutlined
    }
};
</script>

<style></style>
