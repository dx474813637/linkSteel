<template>
	<view class="weixin-official-account" v-if="show" :style="{'opacity':opacity}">
		<text class="txt">{{msg}}</text>
		<button type="default" class="btn btn-official">
			关注
			<official-account class="official-account" id="official_account"></official-account>
		</button>
		<icon class="custom-icon-quxiao custom-icon " @click="close"></icon>
	</view>
</template>
<script>
	export default {
		props: {
			msg: {
				type: [String],
				default: '关注微信公众号'
			},
			isFollow: {
				type: [Boolean],
				default: false
			},
			max: {
				type: [String, Number],
				default: -1
			}
		},
		data() {
			return {
				show: true,
				opacity: 0
			}
		},
		mounted() {
			// this.$nextTick(() => {
			// 	this.init();
			// })
			setTimeout(() => {
				this.init();
			}, 1000)
		},
		methods: {
			init() {
				let that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('#official_account').boundingClientRect(data => {
					if (data.width && data.height) {
						that.check();
					} else {
						that.show = false;
					}
				}).exec();
			},
			async check() {
				try {
					const num = uni.getStorageSync('CLOSE_OFFICIAL_ACCOUNT');
					console.log(this.max)
					if (this.max != -1 && +num >= this.max) {
						this.show = false;
						return false;
					}
					this.show = !this.isFollow;
					if (this.show) this.opacity = 1;
				} catch (e) {
					this.show = false;
				}
			},
			close() {
				this.show = false;
				const num = uni.getStorageSync('CLOSE_OFFICIAL_ACCOUNT') ? +uni.getStorageSync('CLOSE_OFFICIAL_ACCOUNT') + 1 : 1;
				uni.setStorageSync('CLOSE_OFFICIAL_ACCOUNT', num);
			}
		}
	}
</script>
<style scoped lang="scss">
	.weixin-official-account {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// min-height: 80rpx;
		padding: 20rpx 10rpx 20rpx 30rpx;
		background: rgba(0, 0, 0, .6);
		border-radius: 6rpx;

		.txt {
			font-size: 28rpx;
			color: #fff;
			flex: 1;
			padding-right: 5px;
		}

		.btn {
			flex: 0 0 56px;
			position: relative;
			width: 56px;
			height: 20px;
			line-height: 20px;
			padding: 0;
			background: #2878FF;
			border-radius: 10px;
			overflow: hidden;
			text-align: center;
			font-size: 24rpx;
			color: #fff;

			.official-account {
				position: absolute;
				z-index: 20211209;
				right: -14px;
				top: -40px;
				// opacity: 0;
			}
		}

		.custom-icon-quxiao {
			flex: 0 0 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50rpx;
			height: 40rpx;
			font-size: 22rpx;
			color: #fff;
		}
	}

</style>
