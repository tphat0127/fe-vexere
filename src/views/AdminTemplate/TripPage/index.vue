<template>
  <router-link to="/admin/trips/create">
    <a-button>Tạo chuyến đi</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    bordered
    :loading="$store.state.trip.loading"
    :rowKey="(record) => record._id"
  >
    <template #action="{ record }">
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="onDelete(record._id)"
      >
        <a-button type="danger">Delete</a-button>
      </a-popconfirm>

      <a-divider type="vertical" />
      <router-link :to="`/admin/trips/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/trip/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_TRIP);
  },
  computed: {
    methods: {
      onDelete(id) {
        this.$store.dispatch("actFetchDeleteTrip", id);
      },
    },
    data() {
      return this.$store.state.trip.data;
    },
    columns() {
      return [
        {
          title: "Start",
          dataIndex: "fromStationId.name",
          key: "fromStationId.name",
          slots: { customRender: "fromStationId.name" },
        },
        {
          title: "End",
          dataIndex: "toStationId.name",
          key: "toStationId.name",
          slots: { customRender: "toStationId.name" },
        },
        {
          title: "Start Time",
          dataIndex: "startTime",
          key: "startTime",
          slots: { customRender: "startTime" },
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          slots: { customRender: "price" },
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" },
        },
      ];
    },
    loading() {
      return this.$store.state.trip.loading;
    },
  },
  components: {
  },
};
</script>
<style>
.ant-list-item-meta-title {
  font-weight: bold !important;
}
</style>
