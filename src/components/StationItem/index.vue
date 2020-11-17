<template>
	<a-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" >
		<router-link :to="`/stations/${station._id}`">
			<a-card hoverable>
				<template #cover>
				<img
					alt="example"
					src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				/>
				</template>
				<a-card-meta :description="station.address">
				<template #title>
					{{station.name}}
				</template>
				<template #avatar>
					<EnvironmentOutlined :style="{fontSize: '3em', color: '#08c'}" />
				</template>
				</a-card-meta>
			</a-card>
		</router-link>
	</a-col>
</template>

<script>
import { EnvironmentOutlined } from "@ant-design/icons-vue";
export default {
	 props: ["station"],
    components: {
        EnvironmentOutlined
	 },
	 computed: {
		 loading() {
			return this.$store.state.station.loading;
		 }
	 }
}
</script>

<style>

</style>https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png