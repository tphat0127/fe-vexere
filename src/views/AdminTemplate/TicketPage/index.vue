<template>
  <router-link to="/admin/tickets/create">
    <a-button>Create</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    bordered
    :loading="$store.state.ticket.loading"
    :rowKey="(record) => record._id"
  >
    <template #seats="{ text: tags }">
        <span>
          <a-tag v-for="tag in tags" :key="tag" color="blue">{{ tag.code }}</a-tag>
        </span>
    </template>
    <template #action="{ record }">
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="onDelete(record._id)"
      >
        <a-button type="danger">Delete</a-button>
      </a-popconfirm>

      <a-divider type="vertical" />
      <router-link :to="`/admin/tickets/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/ticket/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_TICKET);
  },
  mounted() {
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch("actFetchDeleteTicket", id);
    },
  },
  computed: {
    data() {
      return this.$store.state.ticket.data;
    },
    columns() {
      return [  
        {
          title: "Người tạo",
          dataIndex: "userId.email",
          key: "userId",
          slots: { customRender: "userId" },
        },
        {
          title: "Điểm đi",
          dataIndex: "tripId.fromStationId.province",
          key: "tripId.fromStationId",
          slots: { customRender: "tripId.fromStationId.province" },
        },
       {
          title: "Điểm đến",
          dataIndex: "tripId.toStationId.province",
          key: "tripId.toStationId",
          slots: { customRender: "tripId.toStationId.province" },
        },
        {
          title: "Ghế",
          dataIndex: "seats",
          key: "seats",
          slots: { customRender: "seats" },
        },
        {
          title: "Tổng tiền",
          dataIndex: "totalPrice",
          key: "ticketType",
          slots: { customRender: "totalPrice" },
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" },
        },
      ];
    },
  },
};
</script>
