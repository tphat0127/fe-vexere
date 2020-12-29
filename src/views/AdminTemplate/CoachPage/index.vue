<template>
  <router-link to="/admin/coach/create">
    <a-button>Create</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    bordered
    :loading="$store.state.coach.loading"
    :rowKey="(record) => record._id"
  >
    <template #thumbnail="{ text }">
      <img :src="text" width="68" height="68" />
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
      <router-link :to="`/admin/stations/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/coach/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_COACH);
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch("actFetchDeleteCoach", id);
    },
  },
  computed: {
    data() {
      return this.$store.state.coach.data;
    },
    columns() {
      return [
        {
          title: "thumbnail",
          dataIndex: "thumbnail",
          key: "thumbnail",
          slots: { customRender: "thumbnail" },
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          slots: { customRender: "name" },
        },
        {
          title: "Seats",
          dataIndex: "seats",
          key: "seats",
          slots: { customRender: "seats" },
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
