<template>
	<view class="u-content">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ``
			}
		},
		async onLoad() {
			uni.showLoading({
				
			})
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.agreement();
				if(res.code == 1) {
					this.content = res.list.info
					uni.setNavigationBarTitle({
						title: res.list.title
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
    .u-content {
		
    }
</style>