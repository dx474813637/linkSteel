<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="close"  
			@open="open"  
			round="25"
			bgColor="#fff"
		>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18" :style="{
					backgroundColor: themeConfig.navBg,
					}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item ">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34 text-base">选择对应票据账户</text>
						</view>
						<view class="item u-text-right">
							<text class="u-info" @click="handleSearch">刷新</text>
						</view>
					</view> 
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
					}">
					<template v-if="loading">
						<view class="load-w u-flex u-flex-items-center u-flex-center" :style="{
							backgroundColor: themeConfig.mask,
						}">
							<u-loading-icon mode="circle" size="36" text="获取最新数据中..." 
							:color="themeConfig.followCard.indicatorColor" 
							:inactiveColor="themeConfig.followCard.indicatorActiveColor" 
							vertical></u-loading-icon>
						</view>
					</template>
					<template v-else >
						<u-list  
							enableBackToTop
							@scrolltolower="scrolltolower"
							:preLoadingScreen="100"
							height="100%">
							<u-list-item
								v-for="(item, index) in list"
								:key="item.id">
								<view class="u-p-10">
									<!-- <view class="u-p-20 u-flex u-flex-items-center bg-white"
										:style="{ 
											border: '1rpx solid #dedede',
											borderRadius: '10rpx'
										}"
									> -->
										<view class="pj-box bg-white u-radius-10 uni-shadow-base u-p-30"
											@click="selectLabel(item)">
											<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
												<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">账户名称</view>
												<view class="item u-font-30 u-text-right">{{item.acctName}}</view>
											</view> 
											<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
												<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">电票账户</view>
												<view class="item u-font-30 u-text-right">{{item.acctNo}}</view>
											</view> 
											<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
												<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">开户行号</view>
												<view class="item u-font-30 u-text-right">{{item.acctSvcr}}</view>
											</view> 
										</view>
									<!-- </view> -->
								</view>
							</u-list-item>
							<template name="dataStatus">
								<template v-if="list.length == 0">
									<u-empty
										mode="data"
										:icon="themeConfig.empty"
									>
									</u-empty>
								</template> 
							</template>
						</u-list>
					</template> 
				</view> 
				
				<view class="confirm-rows u-p-20" :style="{
					backgroundColor: themeConfig.navBg,
					height: '40px'
				}"> </view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupBillAcc",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			theme: {
				type: String,
				default: 'white'
			},
			api: {
				type: String,
				default: 'sino_bill_account_list_account'
			},
			params: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				list: [],
				curP: 1,
				loadstatus: 'nomore',
				loading: false,
			};
		},
		watch: {
			
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
			...mapActions({
				
			}),
			initParamas() {
				this.curP = 1;
				this.list = []; 
			}, 
			open() {
				if(this.list.length == 0) { 
					this.handleSearch()
				}
			},
			close() {
				this.$emit('close') 
			},
			selectLabel(data) {
				this.$emit('confirm', {...data})
				this.close()
			},  
			async handleSearch() {
				if(this.loading) return
				this.loading = true
				this.initParamas() 
				await this.getData()
				this.loading = false
			},
			scrolltolower() {
				// this.getMoreData()
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			async getData() { 
				// if(this.loadstatus != 'loadmore') return
				// this.loadstatus = 'loading'
				// const res = await this.$api[this.api]({ params: this.params })
				const res = await this.$api['order_get_account']({ params: this.params})
				if(res.code == 1) {
					this.list = res.list.list_accounts
				}
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
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
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
