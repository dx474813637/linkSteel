<template>
	<view>
		<u-popup :show="show" mode="center" @close="close" :safeAreaInsetBottom="false" @open="open" :overlayStyle="overlayStyle" round="25"
			:bgColor="themeConfig.pageBg">
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<!-- <view class="header u-p-10" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">系统列表</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							<text class="u-primary" @click="refresh">刷新数据</text>
						</view>
					</view>
				</view> -->
				<view class="main u-p-20" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%">

						<u-list-item v-for="(item, index) in list" :key="index">
							<view class="u-p-10">
								<view class="u-p-20 u-p-t-30 u-p-b-30 u-flex u-flex-items-center u-flex-center" :style="{
											backgroundColor: themeConfig.boxBg,
											borderRadius: '10rpx'
										}" @click="selectLabel(item)">
									<view class="u-font-32" :style="{
												color: themeConfig.baseText
											}">{{item.name}}</view>
								</view>
							</view>
						</u-list-item>

					</u-list>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import { getProjectArr } from '@/utils/isProject.js'
	// console.log(getProjectArr())
	export default {
		name: "menusPopup",
		props: {
			pan: {
				type: String,
				default: 's'
			},
			overlayStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			minNum: {
				type: Number,
				default: 0
			},
			maxNum: {
				type: Number,
				default: 999
			},
			theme: {
				type: String,
				default: 'white'
			},
			show: {
				type: Boolean,
				default: false
			},
			isPPI: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: false
			},
			isMyProduct: {
				type: Boolean,
				default: false
			},
			isMyAllCpy: {
				type: Boolean,
				default: false
			},
			isMduCpy: {
				type: Boolean,
				default: false
			},
			showMode: {
				type: String,
				default: 'grid' //grid or list
			},
			mainkey: {
				type: String,
				default: 'id'
			},
			selectedList: {
				type: Array,
				defualt: () => []
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				menusList2: [],
				searchRes: [],
				searchFocus: false,
				multipleList: [],
				loading: false,
				list: getProjectArr() || []
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
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async refresh() {},
			async open() {},
			close() {
				this.$emit('close')
			},
			selectLabel(data) {
				this.$emit('confirm', {data})
			}
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
		width: 80vw;
		border-radius: 20rpx;
		overflow: hidden;

		.header {}

		.main {
			background-color: #f8f8f8;
			// height: 50vh;
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

		.bottom {}
	}
</style>
