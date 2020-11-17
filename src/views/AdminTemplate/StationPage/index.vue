<template>
  <a-table span="4" :columns="columns" :data-source="data" bordered>
    <template #name="{text}">
      <a>{{ text }}</a>
    </template>
    <template #action="{ }">
        <a-button type="danger">Delete</a-button>
        <a-divider type="vertical" />
        <a-button>Edit</a-button>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    slots: { customRender: 'action' }
  }
];
import * as types from "./../../../store/station/constant"
export default {
    data() {
        return {
            columns
        }
    },
    components: {
    },
    created() {
        this.$store.dispatch(types.A_FETCH_LIST_STATION);
    },
    computed: {
        loading() {
        return this.$store.state.station.loading;
        },
        data() {
        return this.$store.state.station.data;
        }
    }
}
</script>