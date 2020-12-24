<template #renderItem="{ trip }">
  <a-list-item type="flex" justify="space-around" align="middle">
    <a-col :span="8">
      <a-list-item-meta>
        <template #description>
          {{ moment(trip.startTime).format("hh:mm") }}
          <a-divider type="vertical" />
          {{ moment(trip.startTime).format("DD/MM/yyyy") }}
        </template>
        <template #title>
          <h3>{{ trip.coachId.name }}</h3>
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
      <a-row type="flex" justify="center" align="middle">
        <a-list-item-meta>
          <template #title>
            {{ trip.fromStationId.name }}
          </template>
          <template #description>
            {{ trip.fromStationId.province }}
          </template>
        </a-list-item-meta>
      </a-row>
    </a-col>
    <a-col :span="4">
      <a-row type="flex" justify="center" align="middle">
        <a-col>
          <img src="/img/trip-icon.png" width="128" height="64" />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="4">
      <a-row type="flex" justify="center" align="middle">
        <a-list-item-meta>
          <template #title>
            {{ trip.toStationId.name }}
          </template>
          <template #description>
            {{ trip.toStationId.province }}
          </template>
        </a-list-item-meta>
      </a-row>
    </a-col>
    <a-col :span="4">
      <b style="color: blue; font-size: 24px">{{ trip.price }} d</b>
      <a-button 
        :type="isShowBookForm == false ? `primary` : `success`" 
        @click="showConfirm(trip._id)"
        >{{isShowBookForm == false ? "Đặt vé" : "Đóng"}}</a-button
      >
    </a-col>
  </a-list-item>

  <a-list-item v-show="isShowBookForm"><Booking :bookTrip="trip"/></a-list-item>
</template>
<script>
import moment from "moment";
import Booking from "./../Booking"
// import { Modal } from "ant-design-vue";
// import { createVNode } from "vue";
// import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export default {
  props: ["trip"],
  data() {
    return {
      isShowBookForm: false,
    }
  },
  methods: {
    moment,
    showConfirm() {
      // Modal.confirm({
      //   title: "Xác nhận xóa chuyến đi này?",
      //   content: id,
      //   okText: "Delete",
      //   icon: createVNode(ExclamationCircleOutlined),
      //   onOk: () => {
      //     this.$store.dispatch("actFetchDeleteTrip", id);
      //   },
      //   onCancel() {},
      // });
      this.isShowBookForm= !this.isShowBookForm;

    },
  },
  components: {
    Booking
  }
};
</script>
<style></style>
