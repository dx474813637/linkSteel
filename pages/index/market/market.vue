<template>
	<view class="text-white w " :class="[typeActive]" :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar :title="onlineControl.title" ></navBar>
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="{
						...activeTabsStyle, 
						color: themeConfig.tabTextActive, 
						border: `1px solid ${themeConfig.tabTextActive}`,
						padding: '0 4px',
						borderRadius: '3px'
					}"
					:inactiveStyle="{ color: themeConfig.tabTextInactive}"
					:itemStyle="itemTabsStyle" 
					@click="handleTabsChildrenClick"
				>
				</u-tabs>
			</view>
			<view class="tabs-w" v-if="tabs_list2.length > 0">
				<u-tabs
					:list="tabs_list2"
					:current="tabs_current2"
					lineHeight="0"
					:activeStyle="{...activeTabsStyle, color: themeConfig.tabTextActive}"
					:inactiveStyle="{ color: themeConfig.tabTextInactive}"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				>
				</u-tabs>
			</view>
		</view>
		<view class="list" :style="{
			height: `calc(100% - 182px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
			
			<template v-if="skeletonLoading">
				<view class="u-p-20 animation" v-for="item in 4" :key="item">
					<u-skeleton loading   animate rows="3" :title="false" avatarShape="square" avatarSize="48"></u-skeleton>
				</view>
			</template>
			<template v-else>
				<u-list
						height="100%"
						enableBackToTop
						@scrolltolower="scrolltolower"
						:preLoadingScreen="100"
					>
						<u-list-item
							v-for="(item, index) in indexList"
							:key="item.id"
							>
							<view class="u-p-l-20 u-p-r-20 u-p-t-20">
								<view
									v-if="index == 0"
									class="u-m-b-20"
								>
									<view class="title-card u-m-t-20">
										<view class="title-top"
											:style="{
												backgroundColor: themeConfig.marketCard.boxBgTop,
											}"
										>
											<view class="t u-font-36 u-text-center u-p-15"
												:style="{
													backgroundColor: themeConfig.marketCard.tBg,
													color: themeConfig.marketCard.jiaoColor,
												}"
											>
												<text :style="{color: themeConfig.tabTextActive}">
													{{tabs_list2[tabs_current2].name + tabs_list[tabs_current].name}} 
												</text>
											</view>
										</view>
										<view class="title-bottom u-p-20 u-flex u-flex-between u-flex-items-center"
											:style="{
												backgroundColor: themeConfig.marketCard.boxBgBottom,
												color: themeConfig.marketCard.subText
											}"
										>
											<view class="item u-flex-1">类型</view>
											<view class="item u-flex-2">价格</view>
											<view class="item u-flex-1">交货地</view>
											<view class="item u-flex-1">数量</view>
										</view>
									</view>
								</view>
								<cardMarket
									:cid="item.id"
									:name="item.name"
									:origin="item"
									:price="item.price"
									:dprice="item.dprice"
									:trade_type="item.trade_type"
									:unit="item.unit"
									:num="item.amount"
									:delivery_place="item.delivery_place"
									:spec="item.spec || item.spec1"
									:pubDate="item.Product_trade.post_time"
									:type="item.Product_trade.trade_type"
									@detail="handleRouteTo"
								></cardMarket>
							</view>
							
						</u-list-item>
						
						<template name="dataStatus">
							<template v-if="indexList.length == 0">
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
		
		<menusBar tabbar :activeIndex="3" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				onlineControl: {
					share_title: '',
					title: ''
				},
				skeletonLoading: true,
				show: false,
				// pan: 's',
				// pageConfig: {
				// 	's': {
				// 		navtitle: '卖盘中心',
				// 		menuIndex: 0
				// 	},
				// 	'b': {
				// 		navtitle: '买盘中心',
				// 		menuIndex: 1
				// 	},
				// },
				keyword: '', 
				tabs_current: 0,
				tabs_current2: 0,
				activeTabsStyle: {
					fontSize: '17px',
					color: '#fff'
				},
				itemTabsStyle: {
					height: '44px',
					fontSize: '16px',
					padding: '0 13px'
				},
				tabs_list: [],
				tabs_list2: [],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			paramsObj() { 
				return {
					pid: this.tabs_list2[this.tabs_current2]?.pid,
					p: this.curP,
					jg: this.tabs_list[this.tabs_current]?.id == 2 ? '1' : ''
				}
			}
		},
		async onLoad(options) {
			// console.log(options) 
			if(options.hasOwnProperty('current')) {
				this.tabs_current2 = Number(options.current) 
			}
			if(options.hasOwnProperty('cate')) {
				this.tabs_current = Number(options.cate)
			}
			uni.showLoading()
			await this.getTabs()
			await this.getData()
		},
		methods: {
			async getTabs() {
				// const res = await this.$api.getStandard({params: {is_market: 1}})
				const res = await this.$api.future_basis_cate()
				if(res.code == 1) {
					this.tabs_list = res.list.map(ele => {
						ele.disabled = false 
						return ele
					})
					if(this.tabs_list[this.tabs_current].id == 3) {
						uni.reLaunch({
							url: '/pages/index/pan/panBasis'
						})
						return 
					}
					this.renderTabsChildren()
				}
			},
			renderTabsChildren() {
				this.tabs_list2 = this.tabs_list[this.tabs_current].list.map(ele => {
						ele.disabled = false
						return ele
					})
			},
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			changeTabsStatus(listname, key, value) {
				this[listname] = this[listname].map(ele => {
					ele[key] = value;
					return ele
				})
			},
			handleTabsChildrenClick(obj) {
				// console.log(obj) 
				if(this.tabs_list[obj.index].id == 3) {
					uni.reLaunch({
						url: '/pages/index/pan/panBasis'
					})
					return
				}
				this.tabs_current = obj.index
				this.customShareParams.cate = obj.index 
				this.handleTabsChange({index: 0})
			},
			async handleTabsChange(obj) {
				this.tabs_current2 = obj.index 
				this.customShareParams.current = obj.index
				this.changeTabsStatus( 'tabs_list2', 'disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus( 'tabs_list2', 'disabled', false)
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.future_trade({params: this.paramsObj})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length == res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
				this.skeletonLoading = false
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleRouteTo({id, type}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${type}`
				})
			},
		}
	}
</script>

<style lang="scss">
	
	page {
		height: 100vh;
		.dark /deep/ {
			.u-skeleton {
				&__wrapper {
					&__avatar {
						background: #1e1f31!important;
						&--circle {}
						&--square {}
					}
					&__content {
						&__rows,
						&__title {
							background: #1e1f31!important;
						}
					}
				}
			}
		}
		.white /deep/ {
			.u-skeleton {
				&__wrapper {
					&__avatar {
						background: #dcdcdc!important;
						&--circle {}
						&--square {}
					}
					&__content {
						&__rows,
						&__title {
							background: #dcdcdc!important;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
	
	.animation {
		animation: shandong 1.5s ease infinite;
	}
	@keyframes shandong {
		50% {
			opacity: .5;
		}
		100% {
			opacity: 1;
		}
	}
	.title-card {
		position: relative;
		.title-top {
			height: 40px;
			border-radius: 20rpx 20rpx 0 0;
			position: relative;
			.t {
				width: 280px ;
				position: relative;
				top: -20rpx;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 0 0 20rpx 20rpx;
				&:before,
				&:after {
					content: '';
					position: absolute;
					top: 0;
					width: 0;
					height: 0;
					border-top: 10px solid transparent;
					border-bottom: 0;
				}
				&:before {
					right: 100%;
					border-left: 0;
					border-right: 5px solid ;
				}
				&:after {
					left: 100%;
					border-right: 0;
					border-left: 5px solid ;
				}
			}
		}
		.title-bottom {
			border-radius: 0 0 20rpx 20rpx;
			overflow: hidden;
			.item {
				// flex: 0 0 25%;
				text-align: center;
				&:first-child {
					text-align: left;
				}
				&:last-child {
					text-align: right;
				}
			}
		}
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));
		
	}
</style>
