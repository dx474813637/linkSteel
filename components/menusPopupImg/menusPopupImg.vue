<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="close" 
			@open="open"
			round="25"
			:bgColor="themeConfig.pageBg"
		>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">微信名片</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							<text class="u-error" @click="close">取消</text>
						</view>
					</view>
					
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}"> 
					<view class="u-flex u-flex-items-center u-flex-center u-p-t-40">
						<u--image radius="8" mode="widthFix" width="80vw" height="auto" :src="wx_img" /> 
					</view> 
					<view class="u-flex u-flex-center u-info u-font-28 u-p-30 u-text-center">
						长按图片保存二维码
					</view>
				</view> 
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupImg",
		props: {
			theme: {
				type: String,
				default: 'white'
			}, 
			show: {
				type: Boolean,
				default: false
			}, 
			wx_img: {
				type: String,
				default: ''
			},
		},
		async mounted() {},
		data() {
			return {
				loading: false, 
			};
		}, 
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			}, 
		},
		methods: {  
			open() {
				
			},
			close() {
				this.$emit('close')
			},  
		}
	}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
	.load-w {
		width: 100%;
		height: 100%;
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			// height: 50vh;
			min-height: 20vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
