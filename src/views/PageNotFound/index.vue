<template>
  <a-result status="404" title="404" sub-title="Trang không tồn tại!">
    <template #extra>
      <a-button type="primary">
        <router-link to="/">Trang chủ</router-link>
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {};
</script>

<style></style>
