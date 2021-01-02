<template>
  <router-link to="/admin/users/create">
    <a-button type="link">Create new user</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    :loading="$store.state.user.loading"
    :rowKey="(record) => record._id"
  >
    <template #fullName="{ text, record }">
      <a-avatar :src="`http://localhost:5555/images/${record.avatarUrl}`" /> {{ text }}
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
      <router-link :to="`/admin/users/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/user/constant";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_USER);
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch("actFetchDeleteUser", id);
    },
  },
  computed: {
    data() {
      return this.$store.state.user.data;
    },
    columns() {
      return [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          slots: { customRender: "email" },
        },
        {
          title: "Full name",
          dataIndex: "fullName",
          key: "fullName",
          slots: { customRender: "fullName" },
        },
        {
          title: "User type",
          dataIndex: "userType",
          key: "userType",
          slots: { customRender: "userType" },
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
