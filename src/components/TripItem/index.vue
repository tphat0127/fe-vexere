<template
  #renderItem="{ trip }"
  type="flex"
  justify="space-between"
  align="middle"
>
  <a-list-item>
    <a-col :span="6">
      <a-list-item-meta :description="'Nhà xe: ' + trip.coachId.name">
        <template #title>
          Từ {{ trip.fromStationId.province }} đến
          {{ trip.toStationId.province }}
        </template>
        <template #avatar>
          <a-avatar
            style="color: #f56a00"
            shape="square"
            :src="trip.coachId.thumbnail"
            :size="64"
          />
        </template>
      </a-list-item-meta>
    </a-col>
    <a-col :span="4">
      <a-list-item-meta :description="trip.fromStationId.name">
        <template #title>
          {{ moment(trip.startTime).format("hh:mm") }}
        </template>
      </a-list-item-meta>
    </a-col>
    <a-col :span="4">
      <img src="/img/trip-icon.png" width="128" height="64" />
    </a-col>
    <a-col :span="4">
      <a-list-item-meta :description="trip.toStationId.name">
        <template #title>
          {{ moment(trip.startTime).format("hh:mm") }}
        </template>
      </a-list-item-meta>
    </a-col>
    <a-col :span="3"> Giá {{ trip.price }} đ </a-col>
    <a-col :span="3">
      <router-link :to="`/admin/trips/${trip._id}/detail`">
        <a-button type="primary">Detail</a-button>
      </router-link>
      <a-divider type="vertical" />
      <a-button type="danger" @click="showConfirm(trip._id)">Xóa</a-button>
    </a-col>
  </a-list-item>
</template>
<script>
import moment from "moment";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export default {
  props: ["trip"],
  methods: {
    moment,
    showConfirm(id) {
      Modal.confirm({
        title: "Xác nhận xóa chuyến đi này?",
        content: id,
        okText: "Delete",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => {
          this.$store.dispatch("actFetchDeleteTrip", id);
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style></style>
