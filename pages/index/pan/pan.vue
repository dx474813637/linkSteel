<template>
	<view class="text-white w " :class="[typeActive]" :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar :title="`${onlineControl.title? onlineControl.title :pageConfig[pan].navtitle}`" ></navBar>
			<view class="search-w u-p-l-20 u-p-r-20 u-p-b-10 u-p-t-10 u-flex u-flex-items-center ">
				<view @click="handleGoto({url: '/pages/index/search/search', params: {pan: pan}})" class="item u-flex-1" >
					<u-search 
						placeholder="搜索商品" 
						:value="keyword"
						:showAction="false"
						disabled
						:bgColor="themeConfig.pageBg"
					></u-search>
				</view>
				<view class="item u-m-l-20">
					<view
						class="u-flex u-flex-items-center"
						:style="{
							color:  themeConfig.tabTextActive
						}"
						@click="handleGoto({url: '/pages/my/broker/edit', params: {pan}})"
					>
						<i class="custom-icon-roundadd custom-icon"></i>
						<text class="u-p-l-8 u-font-30">发布{{pan == 's'? '卖盘' : '买盘'}}</text>
					</view>
				</view>
			</view>
			
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="{...activeTabsStyle, color: themeConfig.tabTextActive}"
					:inactiveStyle="{ color: themeConfig.tabTextInactive}"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				> 
					<view 
						slot="right"
						class="u-p-r-20 u-flex u-flex-items-center"
						:style="{
							color: themeConfig.pan.pageText
						}"
						@click="show = true"
					>
						<i class="custom-icon-filter2 custom-icon"></i>
						<text class="u-p-l-8 u-font-30">分类筛选</text>
					</view>
					
				</u-tabs>
			</view>
			<!-- <view class="addr-w u-p-10 u-p-l-20 u-p-r-20 u-font-30"
				:style="{
					backgroundColor: themeConfig.pageBg
				}"
				v-if="area_show == 1"
			>
				<view class="u-p-10 u-p-l-20 u-radius-5 u-flex u-flex-items-center" 
					:style="{
						backgroundColor: themeConfig.boxBgBottom,
						height: '100%',
						boxSizing: 'border-box'
					}"
				>
					<view class="item u-flex u-flex-items-center" :style="{
							color: themeConfig.pan.pageText,
							whiteSpace: 'nowrap'
						}">
						<i class="custom-icon-weizhi custom-icon u-font-30"></i>
						<view class="u-m-l-5 u-m-r-20 u-font-28" >交货地</view>
					</view>
					<view class="item u-flex u-flex-items-center u-line-1"
						:style="{
							color: themeConfig.dataText,
						}"
					>
						<uni-data-picker
							placeholder="点击进行地区筛选" 
							popup-title="请选择所在地区" 
							:border="false"
							:localdata="addressAreaFilter" 
							v-model="dplace"
							@change="handleValArea"
						></uni-data-picker>
					</view>
				</view>
			</view> -->
		</view>
		<view class="list" :style="{
			height: `calc(100% - 182px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px - ${area_show==1? '50' : '0'}px)`
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
							<cardA
								:name="item.name"
								:pid="item.id"
								:amount="item.amount"
								:color="item.color"
								:price="item.price"
								:dprice="item.dprice"
								:unit="item.unit"
								:spec="pan == 'b' ? item.spec : item.spec1"
								:delivery_place="item.delivery_place"
								:express_time="item.express_time"
								:express_unit="item.express_unit"
								:trade_type="item.trade_type"
								:pubDate="item.post_time"
								:tims="item.Tims"
								:origin="item"
								@tims="handleClickTims"
								@showWxImg="handleClickWxImg"
								@detail="handleRouteTo"
							></cardA>
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
		
		<menusPopup 
			:show="show" 
			:theme="typeActive"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
		<menusPopupImg 
			:show="wxImgShow"  
			:theme="typeActive"
			:wx_img="wx_img"
			@close="wxImgShow = false"
		></menusPopupImg>
		<menusBar tabbar :activeIndex="pageConfig[pan].menuIndex" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				show: false,
				wxImgShow: false,
				wx_img: '',
				pan: 's',
				skeletonLoading: true,
				pageConfig: {
					's': {
						navtitle: '卖盘中心',
						menuIndex: 1
					},
					'b': {
						navtitle: '买盘中心',
						menuIndex: 2
					},
				},
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '30rpx',
					color: '#fff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '全部商品',
						standard: '',
						keyword: '',
						disabled: false,
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				addr: [],
				dplace: '',
				area_show: 0,
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				addressArea: state => state.user.addressArea,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			// addressAreaFilter() {
			// 	if(this.addressArea.length == 0) return []
			// 	const originData = uni.$u.deepClone(this.addressArea) 
			// 	return this.initAddressData(originData, '')
			// },
			paramsObj() {
				return {
					standard: this.tabs_list[this.tabs_current].standard,
					terms: this.tabs_list[this.tabs_current].keyword,
					p: this.curP,
					dplace: this.dplace
				}
			}
		},
		onLoad(options) {
			// this.getAddressArea()
			// console.log(options)
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('dplace')) {
				this.dplace = options.dplace
			}
			if(options.hasOwnProperty('data')) {
				const data = JSON.parse(decodeURIComponent(options.data))
				// console.log(encodeURIComponent(JSON.stringify(data)))
				this.menusConfirm({
					name: data.name,
					id: data.standard,
					keyword: data.keyword || "",
					disabled: false,
				})
				this.tabs_current = 1
			}
			else if(options.hasOwnProperty('keyword')) {
				// this.keyword = options.keyword
				this.menusConfirm({keyword: options.keyword, name: `搜索${options.keyword}结果`})
				this.tabs_current = 1
			}
			else {
				uni.showLoading()
				this.getData()
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			// ...mapActions({
			// 	getAddressArea: 'user/getAddressArea'
			// }),
			async handleValArea(e) {
				// this.addr = e.detail.value
				if(e.detail.value.length == 0) {
					this.dplace = ''
				}else {
					this.dplace = e.detail.value[e.detail.value.length - 1].value 
					this.customShareParams.dplace = this.dplace
				} 
				console.log('c', e, this.dplace)
				await this.refreshList()
			},
			// initAddressData(data, preValue) { 
			// 	data.unshift({
			// 		text: "全部",
			// 		value: preValue + '00'
			// 	})
			// 	data.forEach(ele => {
			// 		if(ele.children && ele.children.length > 0) {
			// 			ele.children = this.initAddressData(ele.children, ele.value)
			// 		}
			// 	}) 
			// 	return data
			// },
			async menusConfirm(data) {
				console.log(data)
				this.tabs_list.push({
					name: data.name,
					keyword: data.keyword || "",
					disabled: false,
					standard: data.id,
				})
				this.show = false;
				this.handleTabsChange({index: this.tabs_list.length - 1})
			},
			refreshList() {
				uni.showLoading()
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(obj) {
				this.tabs_current = obj.index
				if(obj.index == 0) {
					delete this.customShareParams.data
				}else {
					this.customShareParams.data = encodeURIComponent(JSON.stringify(this.tabs_list[obj.index]))
				}
				
				this.changeTabsStatus('disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				// console.log(this.tabs_current)
				const res = await this.$api[this.pan == 's'?'getSell':'getBuy']({params: this.paramsObj})
				// const res = await this.$api.getPanList()
				// console.log(res)
				if(res.code == 1) {
					this.area_show = res.area_show
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					if(this.curP == res.total) {
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
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			},
			handleClickWxImg({wx_img}) { 
				this.wx_img = ''
				if(!wx_img) return
				this.wx_img = wx_img
				this.wxImgShow = true
			},
			handleClickTims({tims, id, origin}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: `咨询${this.pan=='s'? '卖盘': '买盘'}：${origin.name}，https://www.rawmex.cn/${this.pan=='s'? 'sell': 'buy'}-${id}.html`
					}
				})
				// this.handleGoto({
				// 	url: '/pages/index/webview/webview',
				// 	params: {
				// 		_a: 'msg',
				// 		f: 'detail',
				// 		id: `${tims.id}_${tims.ctime}`,
				// 		ttype: this.pan == 's'? 'sell': 'buy',
				// 		tid: id,
				// 		tims: '1'
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		/deep/ {
			.uni-data-tree-dialog {
				color: #333!important;
			}
		}
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
	.addr-w {
		height: 40px;
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));
		
	}
	
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
</style>
