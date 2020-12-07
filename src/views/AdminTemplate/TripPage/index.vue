<template>
  <template v-if="loading"><Loader /></template>
  <a-list item-layout="horizontal" :data-source="data" v-else>
    <template #renderItem="{ item }" type="flex" justify="space-between" align="middle">
      <a-list-item >
        <a-col :span="6">
          <a-list-item-meta
            :description="'Nhà xe: ' + item.coachId.name">
            <template #title>
              Từ {{ item.fromStationId.province }} đến {{ item.toStationId.province }}
            </template>
            <template #avatar>
              <a-avatar style="color: #f56a00" shape="square" :src="item.coachId.thumbnail" :size="64" /> 
            </template>
          </a-list-item-meta>
        </a-col>
        <a-col :span="4">
          <a-list-item-meta
            :description="item.fromStationId.name">
            <template #title>
              {{moment(item.startTime).format('hh:mm')}}
            </template>
          </a-list-item-meta>
        </a-col>
        <a-col :span="4">
          <img src="/img/trip-icon.png" width="128" height="64"/>
        </a-col>
        <a-col :span="4">
          <a-list-item-meta
            :description="item.toStationId.name">
            <template #title>
              {{moment(item.startTime).format('hh:mm')}}
            </template>
          </a-list-item-meta>
        </a-col>
        <a-col :span="3">
          Giá {{ item.price }} đ
        </a-col>
        <a-col :span="3">
          <a-button type="primary">Chi tiết</a-button>
        </a-col>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import * as types from "./../../../store/trip/constant";
//import { Modal } from "ant-design-vue";
//import { createVNode } from 'vue';
//import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import Loader from "./../../../components/Loader"
import moment from 'moment';
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_TRIP);
  },
  methods: {
    // showConfirm(id) {
    //   Modal.confirm({
    //     title: "Do you want to delete these items?",
    //     content: id,
    //     okText: "Delete",
    //     icon: createVNode(ExclamationCircleOutlined),
    //     onOk: () =>{
    //       this.$store.dispatch("actFetchDeleteStation", id);
    //     },
    //     onCancel() {},
    //   });
    //}
    moment,
  },
  computed: {
    data() {
      return this.$store.state.trip.data;
    },
    loading() {
      return this.$store.state.trip.loading;
    }
  },
  components: {
    Loader
  }
};
</script>
<style>
  .ant-list-item-meta-title {
    font-weight: bold !important;
  }
</style>