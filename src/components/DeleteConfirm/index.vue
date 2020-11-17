<template>
    <a-modal
        title="Title"
        :visible="visible"
        :confirm-loading="$store.state.modules.loading"
        @ok="handleOk"
    >
        <p>Are you sure you want to delete this?</p>
    </a-modal>
</template>

<script>
export default {
    props: ["visible"],
    methods: {
        handleOk() {
            //this.$store.dispatch(this.actDeleteName, this.id); 
        },
    }
}
</script>

<style>

</style>