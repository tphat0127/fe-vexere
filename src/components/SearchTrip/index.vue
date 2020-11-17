<template>
    <a-select v-model:value="from" style="width: 120px" @change="handleChange">
        <template #suffixIcon><EnvironmentOutlined /></template>
        <a-select-opt-group label="Province">
            <a-select-option value="hcm">Ho Chi Minh</a-select-option>
            <a-select-option value="hanoi">Ha Noi</a-select-option>
        </a-select-opt-group>
    </a-select>
    <a-select :open="isOpen" v-model:value="to" style="width: 120px" @change="handleChange2">
        <template #suffixIcon><EnvironmentOutlined /></template>
        <a-select-opt-group label="Province">
            <a-select-option value="hcm">Ho Chi Minh</a-select-option>
            <a-select-option value="hanoi">Ha Noi</a-select-option>
        </a-select-opt-group>
    </a-select>
    <a-date-picker v-model:value="date" @change="onChange" />
    <a-button :loading="true"> 
        <template #icon><SearchOutlined /></template>Search
    </a-button>
</template>

<script>
import { EnvironmentOutlined, SearchOutlined} from "@ant-design/icons-vue";
export default {
    data() {
        return {
            date: null,
            isOpen: false,
        };
    },
    components: {
        EnvironmentOutlined,
        SearchOutlined
    },
    methods: {
        onChange(date, dateString) {
            this.date = date;
            console.log(date, dateString);
        },
        handleChange() {
            this.isOpen = true;
        },
        handleChange2() {
            this.isOpen = false;
        }
    },
}
</script>

<style>

</style>