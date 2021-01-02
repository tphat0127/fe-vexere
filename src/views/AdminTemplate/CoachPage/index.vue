<template>
  <router-link to="/admin/coaches/create">
    <a-button type="link">Create new coach</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    :loading="$store.state.coach.loading"
    :rowKey="(record) => record._id"
  >
    <template #thumbnail="{ text, record }">
      <a-avatar :src="`${imgUrl}${text}`" /> {{ record.name }}
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
      <router-link :to="`/admin/coaches/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/coach/constant";
import {imgServer} from "./../../../api"
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_COACH);
  },
  data() {
    return {
      imgUrl: imgServer
    }
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch("actFetchDeleteCoach", id);
    }
  },
  computed: {
    data() {
      return this.$store.state.coach.data;
    },
    columns() {
      return [
        {
          title: "Name",
          dataIndex: "thumbnail",
          key: "thumbnail",
          slots: { customRender: "thumbnail" },
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
