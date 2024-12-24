<template>
	<view class="text-white w" :style="{
		backgroundColor: themeConfig.pageBg,
		transition: 'all .3s'
	}">
		<navBar fixed :projectBtn="switchBtn" :title="onlineControl.title" @projectEvent="projectEvent" ></navBar>
		<u-status-bar></u-status-bar>
		
		<custom-official-account 
			class="cont" 
			:msg="gz_msg" 
			:isFollow="false" 
			:max="-1"
		></custom-official-account>
		<view :style="{
			backgroundColor: themeConfig.navBg,
			paddingTop: '44px'
		}">
			<view @click="handleGoto({url:'/pages/index/search/search'})" class="step1 search-w u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10">
				<u-search
					placeholder="搜索商品" 
					:value="keyword"
					:showAction="false"
					disabled
					:bgColor="themeConfig.pageBg"
				></u-search>
			</view>
			<view class="u-p-b-10 step2">
				<u-notice-bar
					v-if="notice.length > 0"
					:bgColor="themeConfig.navBg" 
					:color="themeConfig.warn" 
					:text="notice.map(ele => ele.title)"
					direction="column"
					mode="link"
					@click="handleNoticeIndex"
				></u-notice-bar>
			</view>
			
		</view>
		
		<view class="main u-p-30"> 
			<view class="u-m-b-30" v-if="ad && ad.length > 0">
				<u-swiper
					:list="ad"
					keyName="img" 
					autoplay 
					circular 
					height="80"
					imgMode="scaleToFill"
					bgColor="transparent"
					@click="swiperClick"
					></u-swiper>
			</view>
			
			<view class="card-w u-m-b-20" v-if="prefecture && prefecture.show && prefecture.list.length > 0" >
				<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
					<view class="item u-flex u-flex-items-center">
						<i class="custom-icon custom-icon-gongsi1 u-font-40" :style="{color: themeConfig.followCard.iconText}"></i>
						<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">{{prefecture.name}}</text>
					</view>
					<view @click="handleGoto({url: '/pages/index/prefectureList/prefectureList'})"  class="item u-flex u-flex-items-center" :style="{color: themeConfig.followCard.subText}">
						<text class="u-font-28 u-p-r-6">更多</text>
						<i class="custom-icon custom-icon-right u-font-28" ></i>
					</view>
				</view>
				<view class="prefecture-main u-radius-10 u-p-15" :style="{ 
					backgroundColor: typeActive == 'white' ? '#fff' : themeConfig.followCard.boxBottomBg
				}">
					<view class="prefecture-list">
						<view class="prefecture-list-item u-p-15 " v-for="(item, index) in prefecture.list" :key="index">
							<prefectureCard :origin="item" :cardType="item.type"></prefectureCard>
						</view>
					</view>
				</view>
			</view>
			
			<view class="card-list">
				<view class="card-item u-m-b-20"
					v-for="(item, index) in panList"
					:key="item.pan"
				>
					<panCard
						:list="item.list"
						:name="item.name"
						:icon="item.icon"
						:pan="item.pan"
						:show="item.show"
						:jpList="jpList"
						:textConfig="item.textConfig"
						@changeTimeData="changeTimeData"
						@finishTime="finishTime"
						@settingClick="handleSettingClick"
					></panCard>
				</view>
				<view class="card-item u-m-b-20"  >
					<panBaseCard
						:list="basePan.list"
						:name="basePan.name"
						:icon="basePan.icon"
						:pan="basePan.pan"
						:show="basePan.show" 
						:textConfig="basePan.textConfig"  
					></panBaseCard>
				</view>
			</view>
			
			<!-- <view class="card-w u-m-b-20" v-if="marketCardList && marketCardList.length > 0">
				<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
					<view class="item u-flex u-flex-items-center">
						<i class="custom-icon custom-icon-shop u-font-40" :style="{color: themeConfig.followCard.iconText}"></i>
						<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">期货商品</text>
					</view>
				</view>
				<u-scroll-list :indicator="false">
					<view class="card-tabs u-flex u-flex-items-center">
						<view class="u-flex u-flex-items-center item u-m-r-30 u-p-30"
							v-for="(item, index) in marketCardList"
							:key="index"
							:style="{
								minWidth: '25%',
								boxSizing: 'border-box',
								backgroundColor: themeConfig.marketCardTabs.itemStyle.backgroundColor,
								color: themeConfig.marketCardTabs.itemStyle.color,
								borderRadius: themeConfig.marketCardTabs.itemStyle.borderRadius,
							}"
							@click="handleMarketCardClick(index)"
						>
							<i class="custom-icon-goods custom-icon" :style="{color: themeConfig.marketCardTabs.iconText}"></i>
							<text class="u-p-l-10" style="white-space: nowrap;">{{item.name}}</text>
						</view>
					</view>
				</u-scroll-list>
			</view> -->
			
			<view class="hq-card-w u-p-20" :style="{backgroundColor: themeConfig.hqCard.hqBg}">
				<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
					<view class="item u-flex u-flex-items-center">
						<i class="custom-icon u-font-40 custom-icon-shujukanban" :style="{color: themeConfig.followCard.iconText}"></i>
						<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">今日行情</text>
					</view>
					<view @click="handleSettingClick" class="item u-flex u-flex-items-center" :style="{color: themeConfig.followCard.subText}">
						<i class="custom-icon custom-icon-shezhi1 u-font-28" ></i>
						<text class="u-font-28 u-p-l-10">设置商品</text>
					</view>
				</view>
				<view class="hq-main u-flex u-flex-wrap">
					<view class="hq-item u-m-b-20"
						v-for="(item, index) in hqList"
						:key="item.ppid"
						:style="{
							color: item.amp > 0 ? themeConfig.redText : (item.amp < 0?themeConfig.greenText : themeConfig.pageText )
						}"
						@click="handleGoto({url: '/pages/baojia/list/list', params: {id: item.ppid, dir: 'jysp' }})"
					>
						<view class="u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10 u-p-l-20 u-p-r-20"
							:style="{
								backgroundColor: themeConfig.hqCard.cardTopBg,
							}"
						>
							<view class="u-font-34 u-line-1" :style="{color: themeConfig.baseText}">{{item.name}}</view>
							<view class="u-font-28">{{item.amp>=0? '+' :''}}{{item.amp}}%</view>
						</view>
						<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10"
							:style="{
								backgroundColor: themeConfig.hqCard.cardBottomBg
							}"
						>
							<view class="u-font-34">{{item.ave}}元</view>
						</view>
						
					</view>
				</view>
			</view>
			
			
		</view>
		<menusPopupProject 
			:show="showProject" 
			:theme="typeActive" 
			@close="showProject = false"
			@confirm="menusConfirmProject"
		></menusPopupProject>
		<!-- <xky-guideStep :step="step" :otherHeight="$u.sys().safeAreaInsets.top + 44"></xky-guideStep> -->
		<u-safe-bottom></u-safe-bottom>
		<menusBar activeIndex="0" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	import { changeProject, current_project, saveApiData } from '@/utils/isProject.js'
	import navBar from '@/components/navBar/navBar.vue'
	import menusBar from '@/components/menusBar/menusBar.vue' 
	import menusPopup from '@/components/menusPopup/menusPopup.vue'
	import prefectureCard from '@/components/prefectureCard/prefectureCard.vue'
	export default {
		mixins: [mixShareInfo],
		name: 'indexItem',
		data() {
			return {
				keyword: '',
				indexList: [],
				prefecture: {
					list: []
				},
				ad: [],
				notice: [],
				hqList: [],
				marketCardList: [],
				curP: 1,
				loadstatus: 'loadmore',
				gz_msg: '关注微信公众号',
				panList: [
					{
						pan: 's',
						name: '卖盘关注',
						icon: 'custom-icon-guanzhu',
						list: [],
						textConfig: {},
						show: 0,
					},
					{
						pan: 'b',
						name: '买盘关注',
						icon: 'custom-icon-guanzhu1',
						list: [],
						textConfig: {},
						show: 0,
					},
					
				], 
				basePan: { 
					name: '基差点价',
					icon: 'custom-icon-all',
					list: [],
					textConfig: {
						name1: '基差点价',
						name2: ''
					},
					show: 0,
				},
				onlineControl: {
					title: '首页'
				},
				attentionJSON: '',
				jpList: [],
				showProject: false,
				switchBtn: 0,
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				echartsConfig: 'theme/echartsConfig',
				sys: 'theme/sys'
			})
		},
		components: {
			menusBar,
			navBar, 
			menusPopup,
			prefectureCard
		},
		created() {
			console.log(uni.$u.sys())
			uni.showLoading()
			this.getHome()
			this.getBidData()
			this.getMarketCard()
			this.getNotice()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			swiperClick(index) {
				uni.navigateTo({
					url: this.ad[index].url
				})
			},
			projectEvent() {
				this.showProject = true
			},
			menusConfirmProject({data}) { 
				if( current_project == data.value) {
					uni.showToast({
						title: '已在当前平台',
						icon: 'error'
					})
					return
				}
				
				this.showProject = false
				changeProject(data.value)
				this.$emit('changeProject')
				// this.handleGoto({url: data.index, type: 'reLaunch'})
				
			},
			handleNoticeIndex(index) {
				this.handleGoto({
					type: 'reLaunch',
					url: `/pages/index/notice/notice`
				})
			},
			finishTime({data, refs_name}) {
				let id = data.id
				let index = this.jpList.findIndex(ele => ele.id === id);
				let now = new Date().getTime()
				if(data.Bid_role.is_bid_begin == 1) {
					//预约阶段倒计数结束
					this.jpList[index].time = data.Bid_role.str_etime * 1000 - now
					this.jpList[index].Bid_role.is_bid_begin = '0'
					this.jpList[index].Bid_role.is_biding = '1'
					this.jpList[index].countDownStr = '距竞拍结束还剩'
				}
				else if(data.Bid_role.is_biding == 1) {
					//竞价阶段倒计数结束
					this.jpList[index].time = 0 
					this.jpList[index].Bid_role.is_biding = '0'
					this.jpList[index].Bid_role.is_bid_end = '1'
					this.jpList[index].countDownStr = '竞拍已结束'
				}
			},
			changeTimeData({data, item}) {
				this.jpList.some(ele => {
					if(ele.id == item.id) {
						ele.timeData = data
						return true
					}
					return false
				})
			},
			async getNotice() {
				const res = await this.$api.noticeList({params: {p: 1}})
				if(res.code == 1) {
					this.notice = res.list
				}
			},
			handleMarketCardClick(index) {
				this.handleGoto({
					url: '/pages/index/market/market',
					params: {
						current: index
					}
				})
			},
			refreshList() {
				this.initParamas()
				this.getHome()
				this.getBidData()
				this.getMarketCard()
			},
			initParamas() {
				this.panList[0].list = []
				this.panList[1].list = []
				this.hqList = []
				this.prefecture.list = []
			},
			handleSearch(v) {
				console.log(v)
			},
			async getBidData() {
				const res = await this.$api.getSell({
					params: {
						index: 1,
						trade_mode: 1,
						p: 1,
					}
				})
				if(res.code == 1) {
					let data = res.list
					// 模拟测试
					// let ceshiObj = uni.$u.deepClone(data[0])
					// ceshiObj.Bid_role.str_btime = new Date('2023-1-9 09:53:10').getTime()/1000
					// ceshiObj.Bid_role.str_etime = new Date('2023-1-9 09:54:20').getTime()/1000
					// ceshiObj.Bid_role.is_bid_begin = 0
					// ceshiObj.Bid_role.is_biding = 1
					// ceshiObj.Bid_role.is_bid_end = 0
					// ceshiObj.id = ceshiObj.id + 1
					// data.push(ceshiObj)
					data = data.map(ele => {
						let time = 0;
						let countDownStr = '';
						let now = new Date().getTime()
						// 设置倒计时
						if(ele.Bid_role.is_bid_begin == 1) {
							//预约阶段
							time = ele.Bid_role.str_btime * 1000 - now
						}
						else if(ele.Bid_role.is_biding == 1) {
							//竞拍中
							time = ele.Bid_role.str_etime * 1000 - now
							// console.log(time)
						}
						 
						if(ele.Bid_role.is_bid_begin == 1) countDownStr = '距竞拍开始还剩'
						else if(ele.Bid_role.is_biding == 1) countDownStr = '距竞拍结束还剩'
						else if(ele.Bid_role.is_bid_end == 1) countDownStr = '竞拍已结束' 
						return {
							...ele, 
							countDownStr,
							time,
							timeData: {}
						}
					})
					console.log(data)
					this.jpList = data
				}
			},
			async getMarketCard() {
				const res = await this.$api.getStandard({
					params: {
						is_market: 2
					}
				})
				if(res.code == 1) {
					this.marketCardList = res.list
					this.basePan.list = [{name: '全部', id: ''}, ...res.list]
				}
			},
			async getHome() {
				const res = await this.$api.getHome()
				if(res.code == 1) {
					this.$emit('setOnlineControl', res)
					this.setOnlineControl(res)
					this.panList[0].show = res.sell_show 
					this.panList[1].show = res.buy_show
					this.panList[0].list = this.str2list(res.config.plate1)
					this.panList[1].list = this.str2list(res.config.plate2)
					this.panList[0].textConfig = res.button_name[0]
					this.panList[1].textConfig = res.button_name[1]
					this.basePan.show = res.basis_show
					this.basePan.textConfig = res.button_name[2]
					this.hqList = res.list.quotation
					this.prefecture = res.prefecture
					this.ad = res.ad?.list
					this.gz_msg = res.gz_msg
					this.switchBtn = res.switch
					this.attentionJSON = JSON.stringify(res.config) 
					saveApiData(res.home)
					 
				}
			},
			str2list(str) {
				return str.split(',').map(ele=> {
					let arr = ele.split('|')
					return {
						name: arr[0],
						id: arr[1],
					}
				})
			},
			handleSettingClick({pan}) {
				let current 
				if(pan == 's') current = 0
				else if(pan == 'b') current = 1
				else current = 2
				this.handleGoto({
					url: '/pages/index/attention/attention', 
					params: {
						current: current,
						list: encodeURIComponent(this.attentionJSON)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		min-height: 100vh;
		padding-bottom: 50px;
	}
	.main {
		.banner-img {
			width: 100%;
			border-radius: 16rpx;
		}
		.hq-card-w {
			border-radius: 12rpx;
			
		}
		.hq-main {
			width: 100%;
			.hq-item {
				width: 48%;
				margin-right: 4%;
				border-radius: 10rpx;
				overflow: hidden;
				&:nth-of-type(2n) {
					margin-right: 0;
				}
			}
		}
	}
	
	.cont {
		position: fixed;
		bottom: 70px;  
		bottom: calc(70px + constant(safe-area-inset-bottom));  
		bottom: calc(70px + env(safe-area-inset-bottom));  
		left: 50%;
		transform: translateX(-50%);
		width: 700rpx;
		z-index: 50;
	}
</style>
