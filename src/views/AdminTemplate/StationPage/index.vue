<template>
  <router-link to="/admin/stations/create">
    <a-button>Create</a-button>
  </router-link>
  <a-table
    span="4"
    :columns="columns"
    :data-source="data"
    bordered
    :loading="$store.state.modules.loading"
    :rowKey="record => record._id"
  >
    <template #action="{ record }">
      <a-button type="danger" @click="showConfirm(record._id)">Delete</a-button>
      <a-divider type="vertical" />
      <router-link :to="`/admin/stations/${record._id}/edit`">
        <a-button>Edit</a-button>
      </router-link>
    </template>
  </a-table>
</template>
<script>
import * as types from "./../../../store/modules/constant";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export default {
  created() {
    this.$store.dispatch(types.A_FETCH_LIST_STATION);
  },
  methods: {
    showConfirm(id) {
      Modal.confirm({
        title: "Do you want to delete these items?",
        content: id,
        okText: "Delete",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => {
          this.$store.dispatch("actFetchDeleteStation", id);
        },
        onCancel() {}
      });
    }
  },
  computed: {
    data() {
      return this.$store.state.modules.data;
    },
    columns() {
      return [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          slots: { customRender: "name" }
        },
        {
          title: "Province",
          dataIndex: "province",
          key: "province",
          slots: { customRender: "province" }
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          ellipsis: true
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" }
        }
      ];
    }
  }
};
</script>
