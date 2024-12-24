<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="close"  
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
						<view class="item ">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34 text-base">搜索开户行</text>
						</view>
						<view class="item u-text-right">
							 
						</view>
					</view>
					<view class="u-flex u-flex-items-center" > 
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="建议多个关键字用空格分隔搜索，如：平安 杭州" 
								v-model="keyword"
								:showAction="false"
								:bgColor="themeConfig.pageBg"
								@search="handleSearch"
							></u-search>
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
									<view class="u-p-20 u-flex u-flex-items-center"
										:style="{
											backgroundColor: '#eaeaea',
											border: '1rpx solid #dedede',
											borderRadius: '10rpx'
										}"
										@click="selectLabel(item)"
									>
										<view class="u-font-32"
											:style="{
												color: '#333'
											}"
										>{{item.bank_name}}</view>
										<!-- <view class="u-font-28 u-p-l-20 u-flex-1 u-line-1"
											:style="{
												color: themeConfig.pageTextSub
											}"
										>{{item.to_contact}}</view> -->
									</view>
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
								<template v-else>
									<u-loadmore
										:status="loadstatus"
									/>
								</template>
							</template>
						</u-list>
					</template> 
				</view> 
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupBank",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			theme: {
				type: String,
				default: 'white'
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
				this.loadstatus = 'loadmore'
			}, 
			close() {
				this.$emit('close') 
			},
			selectLabel(menu) {
				this.$emit('confirm', {...menu})
				this.close()
			},  
			async handleSearch() {
				this.loading = true
				this.initParamas()
				uni.showLoading()
				await this.getData()
				this.loading = false
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			async getData() { 
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.sino_fund_account_bank({
					params: {
						terms: this.keyword,
						p: this.curP
					}
				})
				if(res.code == 1) {
					this.list = [...this.list, ...res.list]
					if(this.list.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
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
