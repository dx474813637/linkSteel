<template>
	<view>
		<u-popup :show="show" mode="center" @close="$emit('close')" round="10" :safeAreaInsetBottom="false">
			<view class="u-p-20 ">
				<view class="img-w">
					<u--image
						showLoading
						src="https://wx.rawmex.cn/Public/2023fenxiao/a000.jpg"
						width="80vw"
						height="auto"
						mode="widthFix"
					></u--image>
				</view>
				<view class=" u-p-t-30 u-flex u-flex-items-center">
					<view class="u-m-r-20">昵称</view>
					<u--input v-model="nick" ></u--input>
				</view>
				<view class="u-p-t-20 u-p-b-20 u-text-center u-info u-font-24">设置昵称可以更好保护隐私</view>
				
				<u-button type="primary" @click="submit" throttleTime="500">提交</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"wxDingyuePopup",
		props: {
			show: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				nick: ''
			};
		},
		methods: {
			async submit() {
				if(!this.nick) return;
				const res = await this.$api.save_page_info({
					da_name: this.nick
				})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})
				}
				this.$emit('confirmbtn')
			}
		}
	}
</script>

<style lang="scss">

</style>